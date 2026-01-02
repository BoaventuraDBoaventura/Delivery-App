
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

declare const L: any;

const OrderStatus: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const driverMarkerRef = useRef<any>(null);
  const [driverPos, setDriverPos] = useState({ lat: -23.5650, lng: -46.6500 });
  const customerPos = { lat: -23.5617, lng: -46.6558 };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('tracking-map', {
        center: [(-23.5650 + -23.5617) / 2, (-46.6500 + -46.6558) / 2],
        zoom: 15,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OSM'
      }).addTo(map);

      // Customer Marker
      L.marker([customerPos.lat, customerPos.lng], {
        icon: L.divIcon({
          className: 'customer-icon',
          html: `<div style="background-color: #3b82f6; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="color: white; font-size: 16px;">home</span></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
      }).addTo(map);

      // Driver Marker
      driverMarkerRef.current = L.marker([driverPos.lat, driverPos.lng], {
        icon: L.divIcon({
          className: 'driver-icon',
          html: `<div style="background-color: #ec7f13; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 15px rgba(236, 127, 19, 0.4); display: flex; align-items: center; justify-content: center;"><span class="material-symbols-outlined" style="color: white; font-size: 20px;">moped</span></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      }).addTo(map);

      mapRef.current = map;
    }

    // Simulate movement
    const interval = setInterval(() => {
      setDriverPos(prev => {
        const nextLat = prev.lat + (customerPos.lat - prev.lat) * 0.05;
        const nextLng = prev.lng + (customerPos.lng - prev.lng) * 0.05;
        if (driverMarkerRef.current) {
          driverMarkerRef.current.setLatLng([nextLat, nextLng]);
        }
        return { lat: nextLat, lng: nextLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background h-full relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-900 active:scale-90 transition-transform"><span className="material-symbols-outlined font-bold">arrow_back</span></button>
        <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-md text-[10px] font-black uppercase tracking-widest">Pedido #4821</div>
        <div className="size-10"></div>
      </header>

      <div className="h-[45%] w-full bg-gray-100 relative z-0">
        <div id="tracking-map" className="h-full w-full"></div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl flex items-center gap-3 z-10">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[18px] animate-bounce">moped</span>
          </div>
          <p className="text-[10px] font-black uppercase text-gray-900 tracking-tighter">João está a caminho!</p>
        </div>
      </div>

      <div className="flex-1 -mt-8 bg-white rounded-t-[2.5rem] shadow-2xl relative z-10 p-6 flex flex-col border-t border-gray-100">
        <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
             <h1 className="text-2xl font-black text-gray-900 leading-tight">Chegada em 8-12 min</h1>
             <p className="text-xs text-gray-400 font-medium">Seu pedido está sendo transportado.</p>
          </div>
          <div className="size-16 bg-primary/5 rounded-3xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-4xl">timer</span>
          </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl border border-gray-100 bg-cover" style={{ backgroundImage: `url(https://picsum.photos/seed/driver/200/200)` }}></div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">João Oliveira</h4>
                <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                   <span className="material-symbols-outlined text-[12px] text-yellow-400 fill-current">star</span>
                   4.9 • Honda Biz (ABC-1234)
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="size-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 shadow-sm active:scale-90"><span className="material-symbols-outlined text-[20px]">call</span></button>
                 <button className="size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-90"><span className="material-symbols-outlined text-[20px]">chat</span></button>
              </div>
           </div>

           <div className="bg-gray-50 rounded-[2rem] p-5 border border-gray-100">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Detalhes da Entrega</h3>
              <div className="flex items-start gap-4">
                 <div className="size-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[18px]">location_on</span></div>
                 <div className="flex-1">
                    <p className="text-xs font-bold text-gray-900">Avenida Paulista, 1578</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">Bela Vista, São Paulo - SP</p>
                 </div>
              </div>
           </div>
        </div>

        <button className="mt-auto w-full h-14 bg-white border border-gray-100 rounded-2xl text-gray-900 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-red-500 text-[18px]">support_agent</span>
          Preciso de ajuda com o pedido
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
