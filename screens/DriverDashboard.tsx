
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';

declare const L: any;

type DriverView = 'dashboard' | 'wallet' | 'history';

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const driverMarkerRef = useRef<any>(null);
  
  const [activeView, setActiveView] = useState<DriverView>('dashboard');
  const [isOnline, setIsOnline] = useState(false);
  const [acceptedOrder, setAcceptedOrder] = useState<any>(null);
  const [deliveryStep, setDeliveryStep] = useState<'to_restaurant' | 'at_restaurant' | 'to_customer'>('to_restaurant');
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  
  // Posição inicial simulada
  const [driverPos, setDriverPos] = useState({ lat: -25.9600, lng: 32.5750 });
  const [balance, setBalance] = useState(2450.00);

  const activeOrders = [
    { 
      id: '#8812', 
      restaurantId: '1', 
      restaurant: 'Sabor da Vila', 
      distance: '1.2km', 
      payout: '150.00 MT', 
      status: 'ready',
      customerLocation: { lat: -25.9720, lng: 32.5800, address: 'Av. Mao Tsé Tung, Maputo' }
    },
    { 
      id: '#8815', 
      restaurantId: '2', 
      restaurant: 'Piri-Piri Grill', 
      distance: '3.5km', 
      payout: '280.00 MT', 
      status: 'preparing',
      customerLocation: { lat: -25.9550, lng: 32.5900, address: 'Rua da Argélia, Maputo' }
    }
  ];

  const handleAcceptOrder = (order: any) => {
    setAcceptedOrder(order);
    setDeliveryStep('to_restaurant');
  };

  const handleCompleteStep = () => {
    const restaurant = RESTAURANTS.find(r => r.id === acceptedOrder.restaurantId) || RESTAURANTS[0];
    const customer = acceptedOrder.customerLocation;

    if (deliveryStep === 'to_restaurant') {
      setDriverPos({ lat: restaurant.location.lat, lng: restaurant.location.lng });
      setDeliveryStep('at_restaurant');
    } else if (deliveryStep === 'at_restaurant') {
      setDeliveryStep('to_customer');
    } else {
      setDriverPos({ lat: customer.lat, lng: customer.lng });
      const payoutVal = parseFloat(acceptedOrder.payout.replace(' MT', ''));
      setBalance(prev => prev + payoutVal);
      alert(`Entrega concluída! +${acceptedOrder.payout} adicionados à tua carteira.`);
      setAcceptedOrder(null);
    }
  };

  const openExternalNav = () => {
    const dest = deliveryStep === 'to_customer' ? acceptedOrder.customerLocation : (RESTAURANTS.find(r => r.id === acceptedOrder.restaurantId)?.location || driverPos);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}`, '_blank');
  };

  useEffect(() => {
    if (acceptedOrder && mapContainerRef.current) {
      if (mapRef.current) mapRef.current.remove();

      const restaurant = RESTAURANTS.find(r => r.id === acceptedOrder.restaurantId) || RESTAURANTS[0];
      const customer = acceptedOrder.customerLocation;

      const map = L.map(mapContainerRef.current, {
        center: [driverPos.lat, driverPos.lng],
        zoom: 15,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OSM' }).addTo(map);

      const createIcon = (iconName: string, bgColor: string) => L.divIcon({
        className: 'custom-marker',
        html: `<div style="background-color: ${bgColor}; width: 38px; height: 38px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="color: white; font-size: 22px;">${iconName}</span></div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19]
      });

      L.marker([restaurant.location.lat, restaurant.location.lng], { icon: createIcon('restaurant', '#00D1B2') }).addTo(map);
      L.marker([customer.lat, customer.lng], { icon: createIcon('person_pin_circle', '#1f2937') }).addTo(map);
      driverMarkerRef.current = L.marker([driverPos.lat, driverPos.lng], { icon: createIcon('moped', '#FF5A5F'), zIndexOffset: 1000 }).addTo(map);

      const path = [[driverPos.lat, driverPos.lng], [restaurant.location.lat, restaurant.location.lng], [customer.lat, customer.lng]];
      L.polyline(path, { color: '#FF5A5F', weight: 4, opacity: 0.5, dashArray: '8, 12' }).addTo(map);
      map.fitBounds(path, { padding: [60, 60] });
      mapRef.current = map;
    }
  }, [acceptedOrder]);

  useEffect(() => {
    if (driverMarkerRef.current) {
      driverMarkerRef.current.setLatLng([driverPos.lat, driverPos.lng]);
      if (mapRef.current) mapRef.current.panTo([driverPos.lat, driverPos.lng]);
    }
  }, [driverPos]);

  if (acceptedOrder) {
    const restaurant = RESTAURANTS.find(r => r.id === acceptedOrder.restaurantId) || RESTAURANTS[0];
    return (
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden animate-in fade-in duration-300">
        <header className="absolute top-0 left-0 right-0 z-50 p-5 flex justify-between items-center bg-gradient-to-b from-black/20 to-transparent">
          <button onClick={() => setAcceptedOrder(null)} className="size-11 rounded-2xl bg-white shadow-xl flex items-center justify-center text-gray-900 border border-gray-100"><span className="material-symbols-outlined font-bold">close</span></button>
          <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
            <div className="size-2 bg-secondary animate-pulse rounded-full"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-900">Em Rota</span>
          </div>
          <button onClick={() => setShowIncidentModal(true)} className="size-11 rounded-2xl bg-red-50 text-red-500 shadow-xl flex items-center justify-center border border-red-100"><span className="material-symbols-outlined">warning</span></button>
        </header>

        <div ref={mapContainerRef} className="h-[50%] w-full bg-gray-200" />

        <div className="flex-1 -mt-10 bg-white rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.1)] relative z-10 p-6 flex flex-col border-t border-gray-50 overflow-y-auto no-scrollbar">
          <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6 shrink-0"></div>
          
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className={`size-16 rounded-3xl flex items-center justify-center transition-all shrink-0 ${deliveryStep === 'to_customer' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'}`}>
                <span className="material-symbols-outlined text-4xl">{deliveryStep === 'to_customer' ? 'person_pin_circle' : 'storefront'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{deliveryStep === 'to_customer' ? 'Destino Final' : 'Ponto de Recolha'}</p>
                <h2 className="text-xl font-black text-gray-900 leading-tight truncate">{deliveryStep === 'to_customer' ? acceptedOrder.customerLocation.address : restaurant.name}</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button onClick={openExternalNav} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2 active:scale-95">
                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary"><span className="material-symbols-outlined">directions</span></div>
                <span className="text-[8px] font-black uppercase tracking-widest">Navegar</span>
              </button>
              <button className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2 active:scale-95">
                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400"><span className="material-symbols-outlined">call</span></div>
                <span className="text-[8px] font-black uppercase tracking-widest">Ligar</span>
              </button>
              <button className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2 active:scale-95">
                <div className="size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400"><span className="material-symbols-outlined">chat</span></div>
                <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
              </button>
            </div>
          </div>

          <button onClick={handleCompleteStep} className="w-full h-16 bg-primary text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/30 active:scale-[0.97] hover:brightness-110 transition-all mt-6 shrink-0">
            {deliveryStep === 'to_restaurant' && 'Cheguei ao Local'}
            {deliveryStep === 'at_restaurant' && 'Pedido Recolhido'}
            {deliveryStep === 'to_customer' && 'Confirmar Entrega'}
          </button>
        </div>

        {showIncidentModal && (
          <div className="fixed inset-0 z-[100] flex items-end animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowIncidentModal(false)} />
            <div className="relative w-full bg-white rounded-t-[3rem] p-8 space-y-6 animate-in slide-in-from-bottom duration-500">
              <h3 className="text-xl font-black text-gray-900">Reportar Problema</h3>
              <div className="space-y-3">
                {['Veículo avariado', 'Acidente', 'Endereço incorrecto', 'Cliente não atende', 'Restaurante fechado'].map(issue => (
                  <button key={issue} className="w-full p-5 bg-gray-50 rounded-2xl text-left font-bold text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100">{issue}</button>
                ))}
              </div>
              <button onClick={() => setShowIncidentModal(false)} className="w-full py-4 text-gray-400 font-black text-xs uppercase tracking-widest">Cancelar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-[1.5rem] bg-gray-100 overflow-hidden border-2 border-white shadow-lg">
             <img src="https://picsum.photos/seed/driver1/200/200" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-black text-gray-900 text-base tracking-tight">João Estafeta</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
               <span className={`size-2 rounded-full ${isOnline ? 'bg-secondary' : 'bg-gray-300'}`}></span>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">Maputo Central</p>
            </div>
          </div>
        </div>
        <button onClick={() => setIsOnline(!isOnline)} className={`h-12 px-6 rounded-2xl flex items-center gap-2.5 transition-all font-black text-[10px] uppercase tracking-widest shadow-sm ${isOnline ? 'bg-secondary text-white shadow-lg shadow-secondary/20 border-b-4 border-secondary/20' : 'bg-gray-100 text-gray-400 border-b-4 border-gray-200'}`}>
          <span className={`size-2.5 rounded-full ${isOnline ? 'bg-white animate-pulse' : 'bg-gray-300'}`}></span>
          {isOnline ? 'Online' : 'Ficar Online'}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24">
        {activeView === 'dashboard' && (
          <>
            <div className="bg-primary p-7 rounded-[2.5rem] text-white shadow-2xl shadow-primary/30 relative overflow-hidden group" onClick={() => setActiveView('wallet')}>
              <div className="absolute -top-10 -right-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Ganhos Disponíveis</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight">{balance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}</span>
                <span className="text-xl font-bold opacity-80 uppercase tracking-widest">MT</span>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="bg-white/15 rounded-2xl p-3 backdrop-blur-md border border-white/10 text-center">
                    <p className="text-[8px] font-black uppercase opacity-70">Entregas</p>
                    <p className="font-black text-base">12</p>
                  </div>
                  <div className="bg-white/15 rounded-2xl p-3 backdrop-blur-md border border-white/10 text-center">
                    <p className="text-[8px] font-black uppercase opacity-70">Avaliação</p>
                    <p className="font-black text-base">4.9</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/50">chevron_right</span>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Pedidos Disponíveis</h3>
                {isOnline && <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">Procurando...</span>}
              </div>

              {!isOnline ? (
                <div className="bg-white p-14 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center shadow-sm">
                  <div className="size-28 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-50"><span className="material-symbols-outlined text-6xl text-gray-200">moped</span></div>
                  <h4 className="font-black text-gray-900 text-xl mb-2 tracking-tight">Estás em Descanso</h4>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[220px]">Activa o modo online para receberes novos pedidos.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all hover:border-primary/20">
                      <div className="flex items-center gap-5">
                        <div className="size-16 bg-gray-50 rounded-2xl flex items-center justify-center text-secondary border border-gray-100"><span className="material-symbols-outlined text-4xl">restaurant</span></div>
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900 text-base">{order.restaurant}</h4>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-black text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded-md">{order.id}</span>
                            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">{order.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-primary leading-none tracking-tight">{order.payout}</p>
                        <button onClick={() => handleAcceptOrder(order)} className="h-10 px-5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest mt-4 shadow-xl shadow-primary/20">Aceitar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activeView === 'wallet' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             <div className="flex items-center gap-4">
               <button onClick={() => setActiveView('dashboard')} className="size-10 rounded-full bg-gray-100 flex items-center justify-center"><span className="material-symbols-outlined">arrow_back</span></button>
               <h2 className="text-xl font-black text-gray-900">Minha Carteira</h2>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Saldo Total</p>
                <p className="text-4xl font-black text-gray-900 mb-8">{balance.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT</p>
                <div className="grid grid-cols-2 gap-4">
                   <button className="h-14 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-secondary/20">Levantar M-Pesa</button>
                   <button className="h-14 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">Levantar mKesh</button>
                </div>
             </div>

             <section className="space-y-4">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">Histórico Recente</h3>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                   {[
                     { label: 'Entrega #8810', date: 'Hoje, 10:20', val: '+120.00 MT', color: 'text-secondary' },
                     { label: 'Entrega #8809', date: 'Hoje, 09:15', val: '+180.00 MT', color: 'text-secondary' },
                     { label: 'Levantamento M-Pesa', date: 'Ontem, 18:00', val: '-1.500.00 MT', color: 'text-red-500' },
                   ].map((item, i) => (
                     <div key={i} className="p-5 flex justify-between items-center">
                       <div>
                         <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                         <p className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</p>
                       </div>
                       <span className={`font-black text-sm ${item.color}`}>{item.val}</span>
                     </div>
                   ))}
                </div>
             </section>
          </div>
        )}
      </div>

      <nav className="p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around items-center sticky bottom-0 z-50">
        <button onClick={() => setActiveView('dashboard')} className={`flex flex-col items-center gap-1.5 ${activeView === 'dashboard' ? 'text-primary' : 'text-gray-300'}`}>
          <span className={`material-symbols-outlined text-2xl ${activeView === 'dashboard' ? 'fill-current' : ''}`}>explore</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Geral</span>
        </button>
        <button onClick={() => setActiveView('wallet')} className={`flex flex-col items-center gap-1.5 ${activeView === 'wallet' ? 'text-primary' : 'text-gray-300'}`}>
          <span className={`material-symbols-outlined text-2xl ${activeView === 'wallet' ? 'fill-current' : ''}`}>account_balance_wallet</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Carteira</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center gap-1.5 text-gray-300">
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[9px] font-black uppercase tracking-widest">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default DriverDashboard;
