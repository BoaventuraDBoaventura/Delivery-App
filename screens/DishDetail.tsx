
import React, { useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DISHES } from '../constants';
import { useCart } from '../CartContext';

const DishDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dish = DISHES.find(d => d.id === id) || DISHES[0];
  
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'delivery' | 'pickup'>('delivery');

  const totalPrice = dish.price * quantity;

  const handleAdd = () => {
    addToCart(dish, quantity, notes, fulfillmentMethod);
    navigate(-1);
  };

  return (
    <div className="flex-1 flex flex-col bg-background relative h-full overflow-hidden">
      <div className="relative h-80 shrink-0">
        <img src={dish.image} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-8 left-4 size-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg"><span className="material-symbols-outlined">arrow_back</span></button>
        <div className="absolute bottom-0 w-full h-10 bg-background rounded-t-[2.5rem]"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 -mt-4 pb-48 no-scrollbar">
        <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">{dish.name}</h1>
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
          <span className="text-primary flex items-center gap-1"><span className="material-symbols-outlined text-[14px] fill-current">star</span> 4.9</span>
          <span className="text-red-500">{dish.calories || 450} kcal</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">{dish.description}</p>

        <section className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm mb-8">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Como quer receber?</h3>
          <div className="flex p-1 bg-gray-100 rounded-2xl">
            <button onClick={() => setFulfillmentMethod('delivery')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${fulfillmentMethod === 'delivery' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>Entrega</button>
            <button onClick={() => setFulfillmentMethod('pickup')} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${fulfillmentMethod === 'pickup' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}>Take-Away</button>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Notas Extras</h3>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-5 rounded-3xl bg-white border-2 border-gray-50 focus:border-primary focus:ring-0 text-sm min-h-[120px] resize-none shadow-sm" placeholder="Ex: Sem picante, mais cebola..." />
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-5 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex items-center bg-gray-50 rounded-3xl h-16 px-3 border border-gray-100">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="size-10 flex items-center justify-center rounded-2xl bg-white shadow-sm text-gray-900"><span className="material-symbols-outlined">remove</span></button>
            <span className="w-10 text-center font-black text-lg">{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)} className="size-10 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20"><span className="material-symbols-outlined">add</span></button>
          </div>
          <button onClick={handleAdd} className="flex-1 h-16 bg-primary text-white rounded-3xl font-black flex flex-col justify-center items-center shadow-2xl shadow-primary/20 active:scale-95 transition-transform">
            <span className="text-[10px] uppercase tracking-widest mb-0.5">Adicionar</span>
            <span className="text-base">{totalPrice.toFixed(2).replace('.', ',')} MT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
