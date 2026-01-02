
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { DISHES } from '../constants';
import { Dish } from '../types';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, subtotal, removeFromCart, addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const frequentlyOrdered = DISHES.slice(0, 4);

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

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
          <h1 className="text-lg font-bold text-gray-900">Minha Cesta</h1>
          <div className="size-10"></div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
            <span className="material-symbols-outlined text-6xl">shopping_basket</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Está com fome?</h2>
          <p className="text-gray-500 mb-8 font-medium">Sua cesta está vazia no momento. Escolha um restaurante em Maputo para começar.</p>
          <button onClick={() => navigate('/')} className="bg-primary text-white font-black py-4 px-10 rounded-3xl shadow-lg shadow-primary/20 active:scale-95 transition-all uppercase text-xs tracking-widest">Explorar Maputo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16 shadow-sm">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
        <div className="flex flex-col items-center">
          <h1 className="text-xs font-black text-gray-900 uppercase tracking-widest">Minha Cesta</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Sabor da Vila</p>
        </div>
        <button onClick={() => setItemToDelete('all')} className="size-10 flex items-center justify-center text-red-500"><span className="material-symbols-outlined">delete_sweep</span></button>
      </header>

      <div className="flex-1 overflow-y-auto pb-44 no-scrollbar p-5 space-y-6">
        <div className="space-y-4">
          {cart.map((item: any) => (
            <div key={item.uniqueKey || item.id} className="flex bg-white p-3 rounded-3xl border border-gray-100 shadow-sm">
              <div className="size-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0"><img src={item.image} className="w-full h-full object-cover" /></div>
              <div className="flex-1 flex flex-col justify-between py-1 pl-4 min-w-0">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-gray-900 text-sm truncate">{item.name}</h4>
                  <button onClick={() => setItemToDelete(item.uniqueKey || item.id)} className="text-gray-300"><span className="material-symbols-outlined text-xl">close</span></button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-primary text-sm">{item.price.toFixed(2).replace('.', ',')} MT</span>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-2 py-1 border border-gray-100">
                    <button onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity - 1)} className="size-7 flex items-center justify-center rounded-xl bg-white shadow-sm text-gray-400"><span className="material-symbols-outlined text-sm">remove</span></button>
                    <span className="w-5 text-center text-sm font-black text-gray-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.uniqueKey || item.id, item.quantity + 1)} className="size-7 flex items-center justify-center rounded-xl bg-primary text-white"><span className="material-symbols-outlined text-sm">add</span></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
            <span>Subtotal</span>
            <span className="text-gray-900">{subtotal.toFixed(2).replace('.', ',')} MT</span>
          </div>
          <div className="flex justify-between text-xs font-black text-gray-400 uppercase tracking-widest">
            <span>Taxa de Entrega</span>
            <span className="text-green-600">GRÁTIS</span>
          </div>
          <div className="border-t border-dashed border-gray-100 pt-4 flex justify-between items-center">
            <span className="font-black text-lg text-gray-900 uppercase tracking-[0.2em]">Total</span>
            <span className="font-black text-2xl text-primary">{subtotal.toFixed(2).replace('.', ',')} MT</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-5 z-50 rounded-t-[2rem] shadow-2xl">
        <button onClick={() => navigate('/checkout')} className="w-full bg-primary text-white h-16 rounded-3xl shadow-2xl flex justify-between items-center px-8 transition-all active:scale-[0.98]">
          <span className="font-black text-xs uppercase tracking-widest">Ir para Pagamento</span>
          <span className="font-black text-lg">{subtotal.toFixed(2).replace('.', ',')} MT</span>
        </button>
      </div>

      {itemToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setItemToDelete(null)} />
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-8 relative z-10 shadow-2xl text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Remover item?</h3>
            <p className="text-sm text-gray-500 mb-8">Deseja retirar este prato da sua cesta?</p>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Sim, Remover</button>
              <button onClick={() => setItemToDelete(null)} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest">Manter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
