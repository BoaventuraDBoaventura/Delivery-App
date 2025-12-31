
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-background h-full relative overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <button onClick={() => navigate('/')} className="size-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
        <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-md text-xs font-bold uppercase tracking-wide">Pedido #4821</div>
        <button className="size-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-gray-900"><span className="material-symbols-outlined">help</span></button>
      </header>

      <div className="h-[45%] w-full bg-gray-200 relative">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/800/800')] bg-cover opacity-50 grayscale"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>
            <div className="relative size-16 bg-white rounded-full shadow-lg border-2 border-primary flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-cover" style={{ backgroundImage: `url(https://picsum.photos/seed/logo1/200/200)` }}></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-[10px] font-bold text-primary">PREPARANDO</div>
          </div>
        </div>
      </div>

      <div className="flex-1 -mt-8 bg-white rounded-t-[2.5rem] shadow-2xl relative z-10 p-6 flex flex-col">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full mb-3 text-sm font-bold">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Pedido Confirmado!
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Previsão: 19:40 - 19:50</h1>
          <p className="text-sm text-gray-400 font-medium">O restaurante está preparando seu pedido.</p>
        </div>

        <div className="mb-8 relative px-2">
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 z-0"></div>
          <div className="absolute top-4 left-4 w-1/3 h-0.5 bg-primary z-0"></div>
          <div className="relative z-10 flex justify-between">
             <div className="flex flex-col items-center gap-2">
               <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">receipt_long</span></div>
               <span className="text-[10px] font-bold text-primary">Confirmado</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <div className="size-8 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center animate-pulse"><span className="material-symbols-outlined text-[14px]">skillet</span></div>
               <span className="text-[10px] font-bold text-gray-900">Preparando</span>
             </div>
             <div className="flex flex-col items-center gap-2 opacity-30">
               <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">moped</span></div>
               <span className="text-[10px] font-bold">A caminho</span>
             </div>
             <div className="flex flex-col items-center gap-2 opacity-30">
               <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">home</span></div>
               <span className="text-[10px] font-bold">Entregue</span>
             </div>
          </div>
        </div>

        <div className="bg-background p-4 rounded-3xl border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
            <div className="size-10 rounded-full bg-gray-200 border border-gray-300 bg-cover" style={{ backgroundImage: `url(https://picsum.photos/seed/logo1/200/200)` }}></div>
            <div className="flex-1">
              <h3 className="font-bold text-sm text-gray-900">Sabor da Vila</h3>
              <p className="text-xs text-gray-400">Rua das Flores, 123 • Restaurante</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 h-10 bg-white rounded-xl text-gray-900 font-bold text-xs shadow-sm flex items-center justify-center gap-2"><span className="material-symbols-outlined text-sm">call</span> Ligar</button>
            <button className="flex-1 h-10 bg-white rounded-xl text-gray-900 font-bold text-xs shadow-sm flex items-center justify-center gap-2"><span className="material-symbols-outlined text-sm">chat</span> Chat</button>
          </div>
        </div>

        <button className="mt-auto w-full h-14 bg-white border border-gray-100 rounded-2xl text-gray-900 font-bold flex items-center justify-center gap-2 shadow-sm">
          <span className="material-symbols-outlined text-red-500">support_agent</span>
          Preciso de Ajuda
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
