
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useCart } from '../CartContext';
import { DISHES, RESTAURANTS } from '../constants';
import { Order } from '../types';

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isReordering, setIsReordering] = useState<string | null>(null);

  // Mock past orders with items and specific notes
  // Added customerLocation to satisfy Order interface requirements
  const pastOrders: Order[] = [
    {
      id: 'ord-102',
      restaurantId: '1',
      status: 'delivered',
      date: '10 Set',
      total: 70.80,
      customerLocation: { lat: -23.5617, lng: -46.6558, address: 'Av. Paulista, 1578' },
      items: [
        { ...DISHES[0], quantity: 1, notes: 'Tam: Individual (250g) | Ponto: Ao Ponto | Acomp: Batata Frita Canoa' },
        { ...DISHES[1], quantity: 1, notes: 'Obs: Geleia extra de pimenta' }
      ]
    },
    {
      id: 'ord-101',
      restaurantId: '1',
      status: 'delivered',
      date: '05 Set',
      total: 58.00,
      customerLocation: { lat: -23.5617, lng: -46.6558, address: 'Av. Paulista, 1578' },
      items: [
        { ...DISHES[0], quantity: 1, notes: 'Tam: Individual (250g) | Ponto: Bem passado' }
      ]
    },
    {
      id: 'ord-100',
      restaurantId: '2',
      status: 'delivered',
      date: '01 Set',
      total: 45.90,
      customerLocation: { lat: -23.5617, lng: -46.6558, address: 'Av. Paulista, 1578' },
      items: [
        { ...DISHES[0], quantity: 1 }
      ]
    }
  ];

  const handleReorder = (order: Order) => {
    setIsReordering(order.id);
    
    // Simulate a processing delay for visual feedback
    setTimeout(() => {
      order.items.forEach(item => {
        // Adding the item back to cart preserving its quantity and custom notes
        addToCart(item, item.quantity, item.notes);
      });
      
      setIsReordering(null);
      navigate('/cart');
    }, 800);
  };

  const getRestaurantInfo = (id: string) => {
    return RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-black text-gray-900">Meus Pedidos</h1>
        <button className="text-primary font-bold text-sm">Ajuda</button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4 no-scrollbar">
        {/* Active Order Card */}
        <div className="bg-white p-4 rounded-3xl border-2 border-primary/20 shadow-lg shadow-primary/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
               <span className="size-2 bg-primary rounded-full animate-pulse"></span>
               Em andamento
             </span>
             <span className="text-[10px] font-medium text-gray-400">Previsão: 15-20 min</span>
           </div>
           <div className="flex gap-4">
             <div className="size-16 rounded-full bg-cover shadow-inner border border-gray-100" style={{ backgroundImage: `url(${getRestaurantInfo('1').logo})` }}></div>
             <div className="flex-1 min-w-0">
               <h3 className="font-bold text-gray-900">{getRestaurantInfo('1').name}</h3>
               <p className="text-xs text-gray-400 mt-0.5 truncate">2 itens • R$ 103,90</p>
               <div className="mt-3 flex gap-2">
                 <button onClick={() => navigate('/order-status')} className="flex-1 bg-primary text-white h-10 rounded-2xl text-xs font-bold shadow-md shadow-primary/20 transition-transform active:scale-95">Acompanhar</button>
                 <button className="size-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 active:scale-90 transition-transform"><span className="material-symbols-outlined text-lg">chat</span></button>
               </div>
             </div>
           </div>
        </div>

        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pt-6 mb-2 ml-2">Anteriores</h2>

        {pastOrders.map(order => {
          const restaurant = getRestaurantInfo(order.restaurantId);
          const isCurrentReordering = isReordering === order.id;

          return (
            <div key={order.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md animate-in fade-in duration-500">
              <div className="flex gap-4 items-start">
                <div className="size-14 rounded-2xl bg-cover border border-gray-50 shadow-sm" style={{ backgroundImage: `url(${restaurant.logo})` }}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-none truncate pr-2">{restaurant.name}</h3>
                    <span className="text-gray-900 font-black text-sm shrink-0">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{order.date}</span>
                    <span className="size-1 rounded-full bg-gray-200"></span>
                    <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">check_circle</span>
                      Entregue
                    </span>
                  </div>
                  
                  <div className="mt-3 space-y-1.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col">
                        <p className="text-[11px] text-gray-600 font-medium">
                          <span className="font-black text-gray-400 mr-1">{item.quantity}x</span> {item.name}
                        </p>
                        {item.notes && <p className="text-[9px] text-gray-400 line-clamp-1 truncate italic">{item.notes}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button className="flex-1 border border-gray-100 h-10 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">Detalhes</button>
                    <button 
                      onClick={() => handleReorder(order)}
                      disabled={isReordering !== null}
                      className={`flex-1 h-10 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 uppercase tracking-wider ${isCurrentReordering ? 'bg-primary/20 text-primary' : 'bg-primary text-white shadow-lg shadow-primary/20 active:scale-95'}`}
                    >
                      {isCurrentReordering ? (
                        <div className="size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">refresh</span>
                          Reorder
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="py-12 flex flex-col items-center justify-center text-center opacity-30">
          <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-2xl text-gray-400">history_edu</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest max-w-[220px] leading-relaxed">Mostrando apenas pedidos recentes. Para mais antigos, acesse o portal web.</p>
        </div>
      </div>

      <BottomNav active="orders" />
    </div>
  );
};

export default OrderHistory;
