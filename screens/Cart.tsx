
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { DISHES } from '../constants';
import { Dish, CartItem } from '../types';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, subtotal, removeFromCart, addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  
  // State for confirmation dialog
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Filter some popular dishes as "frequently ordered"
  const frequentlyOrdered = DISHES.filter(d => d.isPopular || d.id === 'd5').slice(0, 4);

  const handleQuickAdd = (dish: Dish) => {
    setAddingId(dish.id);
    addToCart(dish, 1);
    setTimeout(() => setAddingId(null), 1000);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
    }
  };

  const EmptyState = () => (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-6xl">shopping_basket</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sua cesta está vazia</h2>
        <p className="text-gray-500 mb-8">Navegue pelos restaurantes e adicione seus pratos favoritos aqui!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white font-bold py-4 px-10 rounded-3xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          Ver Restaurantes
        </button>
      </div>
      <QuickAddSection />
    </div>
  );

  const QuickAddSection = () => (
    <div className="pb-10 pt-4">
      <div className="px-5 flex items-center justify-between mb-4">
        <h3 className="font-black text-gray-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl">history</span>
          Peça de novo
        </h3>
        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Baseado nos seus pedidos</span>
      </div>
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-5">
        {frequentlyOrdered.map(dish => (
          <div key={dish.id} className="shrink-0 w-44 bg-white rounded-3xl p-3 border border-gray-100 shadow-sm flex flex-col gap-2 group relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              <img src={dish.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={dish.name} />
              <button 
                onClick={() => handleQuickAdd(dish)}
                className={`absolute bottom-2 right-2 size-10 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-90 ${addingId === dish.id ? 'bg-green-500 text-white' : 'bg-primary text-white hover:brightness-105'}`}
              >
                <span className="material-symbols-outlined text-xl">
                  {addingId === dish.id ? 'check' : 'add'}
                </span>
              </button>
            </div>
            <div className="px-1">
              <h4 className="font-bold text-gray-900 text-xs truncate mb-1">{dish.name}</h4>
              <p className="text-primary font-black text-sm">R$ {dish.price.toFixed(2).replace('.', ',')}</p>
            </div>
            {addingId === dish.id && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-3xl flex items-center justify-center animate-in fade-in duration-300">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  Adicionado
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
          <h1 className="text-lg font-bold text-gray-900">Carrinho</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16 shadow-sm">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900 active:bg-gray-100 transition-colors"><span className="material-symbols-outlined">arrow_back</span></button>
        <div className="flex flex-col items-center">
          <h1 className="text-sm font-black text-gray-900 uppercase tracking-widest">Minha Cesta</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Sabor da Vila</p>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full text-red-500 active:bg-red-50 transition-colors"><span className="material-symbols-outlined">delete_sweep</span></button>
      </header>

      <div className="flex-1 overflow-y-auto pb-44 no-scrollbar">
        {/* Fulfillment Method Context Header */}
        <div className="px-5 py-4 bg-white border-b border-gray-50 flex flex-col gap-3">
           <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="size-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center"><span className="material-symbols-outlined">location_on</span></div>
               <div>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Entregar em</p>
                 <p className="text-xs font-bold text-gray-900">Av. Paulista, 1578...</p>
               </div>
             </div>
             <button className="text-[10px] font-black text-primary uppercase border-b-2 border-primary/20 pb-0.5">Mudar</button>
           </div>
        </div>

        <div className="px-5 py-6 flex flex-col gap-4">
          <h3 className="font-black text-gray-900 text-lg flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            Itens do Pedido
          </h3>
          <div className="space-y-4">
            {cart.map((item: any) => (
              <div key={item.uniqueKey || item.id} className="flex flex-col bg-white p-3 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in duration-300">
                <div className="flex gap-4">
                  <div className="size-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-gray-900 text-sm truncate">{item.name}</h4>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${item.fulfillmentMethod === 'pickup' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                            {item.fulfillmentMethod === 'pickup' ? 'Retirada' : 'Entrega'}
                          </span>
                        </div>
                        {item.notes && <p className="text-[10px] text-gray-400 mt-1 line-clamp-1 italic font-medium">"{item.notes}"</p>}
                      </div>
                      <button 
                        onClick={() => setItemToDelete(item.uniqueKey || item.id)} 
                        className="text-gray-300 hover:text-red-500 transition-colors shrink-0 p-1"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-black text-primary">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-2 py-1.5 border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity - 1)} 
                          className="size-7 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400 active:scale-90 transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-5 text-center text-sm font-black text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity + 1)} 
                          className="size-7 flex items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 active:scale-90 transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="mt-4">
           <QuickAddSection />
        </div>

        <div className="px-5 py-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-black text-gray-900 mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Resumo Financeiro
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Subtotal</span>
                <span className="text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Taxa de entrega</span>
                <span className="text-green-600 uppercase tracking-widest">Grátis</span>
              </div>
              <div className="border-t border-dashed border-gray-100 pt-4 mt-4 flex justify-between items-center">
                <span className="font-black text-lg text-gray-900 uppercase tracking-widest">Total</span>
                <div className="text-right">
                  <span className="font-black text-2xl text-primary">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-5 z-50 rounded-t-[2.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between mb-5 px-3">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <span className="material-symbols-outlined">credit_card</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Pagamento</p>
              <p className="text-xs font-bold text-gray-900">Visa •••• 4829</p>
            </div>
          </div>
          <button className="text-[10px] font-black text-primary uppercase self-center px-4 py-2 bg-primary/5 rounded-full transition-colors active:bg-primary/10">Trocar</button>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-primary text-white h-16 rounded-3xl shadow-2xl shadow-primary/30 flex justify-between items-center px-8 transition-all hover:brightness-105 active:scale-[0.98]"
        >
          <span className="font-black text-sm uppercase tracking-[0.2em]">Finalizar Compra</span>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            <span className="material-symbols-outlined font-black">chevron_right</span>
          </div>
        </button>
      </div>

      {/* Confirmation Dialog Overlay */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setItemToDelete(null)}
          />
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="size-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 mx-auto">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Remover item?</h3>
            <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
              Você tem certeza que deseja remover este item da sua cesta?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmDelete}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                Sim, Remover
              </button>
              <button 
                onClick={() => setItemToDelete(null)}
                className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
