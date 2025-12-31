
import React from 'react';
import BottomNav from '../components/BottomNav';

const OrderHistory: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-100">
        <h1 className="text-2xl font-black text-gray-900">Pedidos</h1>
        <button className="text-primary font-bold text-sm">Ajuda</button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4">
        <div className="bg-white p-4 rounded-3xl border-2 border-primary/20 shadow-lg shadow-primary/5">
           <div className="flex items-center justify-between mb-2">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
               <span className="size-2 bg-primary rounded-full animate-pulse"></span>
               Em andamento
             </span>
             <span className="text-[10px] font-medium text-gray-400">Chega em 15-20 min</span>
           </div>
           <div className="flex gap-4">
             <div className="size-16 rounded-full bg-cover" style={{ backgroundImage: `url(https://picsum.photos/seed/logo1/200/200)` }}></div>
             <div className="flex-1 min-w-0">
               <h3 className="font-bold text-gray-900">Sabor da Vila</h3>
               <p className="text-xs text-gray-400 mt-0.5 truncate">2 itens • R$ 103,90</p>
               <div className="mt-3 flex gap-2">
                 <button className="flex-1 bg-primary text-white h-9 rounded-full text-xs font-bold">Acompanhar</button>
                 <button className="size-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"><span className="material-symbols-outlined text-lg">chat</span></button>
               </div>
             </div>
           </div>
        </div>

        {[1,2,3].map(i => (
          <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm opacity-80">
            <div className="flex gap-4 items-start">
              <div className="size-14 rounded-full bg-cover" style={{ backgroundImage: `url(https://picsum.photos/seed/logo${i+1}/200/200)` }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 leading-none">Restaurante Antigo {i}</h3>
                  <span className="text-gray-900 font-bold text-sm">R$ {45+i*10},00</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">{i+10} Set • 1 item • Entregue</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 border border-gray-100 h-9 rounded-full text-xs font-bold text-gray-400">Ver Detalhes</button>
                  <button className="flex-1 bg-primary/10 text-primary h-9 rounded-full text-xs font-bold">Pedir de novo</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="py-8 flex flex-col items-center justify-center text-center opacity-30">
          <span className="material-symbols-outlined text-4xl mb-2">history</span>
          <p className="text-[10px] font-bold uppercase tracking-widest">Estes são seus pedidos recentes</p>
        </div>
      </div>

      <BottomNav active="orders" />
    </div>
  );
};

export default OrderHistory;
