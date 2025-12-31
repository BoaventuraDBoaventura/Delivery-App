
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
           <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
           <h1 className="text-xl font-black text-gray-900">Notificações</h1>
           <button className="size-10 flex items-center justify-center text-gray-900"><span className="material-symbols-outlined">settings</span></button>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
           <button className="px-5 h-9 rounded-full bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20">Todas</button>
           <button className="px-5 h-9 rounded-full bg-white border border-gray-100 text-gray-400 font-bold text-xs">Pedidos</button>
           <button className="px-5 h-9 rounded-full bg-white border border-gray-100 text-gray-400 font-bold text-xs">Promoções</button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Hoje</h3>
             <button className="text-[10px] font-bold text-primary uppercase">Marcar todas lidas</button>
           </div>
           <div className="space-y-3">
             <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 relative">
               <div className="absolute top-4 right-4 size-2.5 bg-primary rounded-full animate-pulse"></div>
               <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined fill-current">moped</span></div>
               <div className="flex-1">
                 <h4 className="font-bold text-gray-900 text-sm">Saiu para entrega! 🛵</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mt-1">O entregador João está a caminho com seu pedido do Burger King. Acompanhe agora!</p>
                 <span className="block mt-2 text-[10px] font-bold text-primary">2 min atrás</span>
               </div>
             </div>
             <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4 relative">
               <div className="absolute top-4 right-4 size-2.5 bg-primary rounded-full"></div>
               <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><span className="material-symbols-outlined fill-current">local_offer</span></div>
               <div className="flex-1">
                 <h4 className="font-bold text-gray-900 text-sm">Almoço com 50% OFF</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mt-1">Aproveite descontos exclusivos em restaurantes selecionados até as 14h. Não perca!</p>
                 <span className="block mt-2 text-[10px] font-bold text-gray-300">2 h atrás</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
