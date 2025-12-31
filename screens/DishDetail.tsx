
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DISHES } from '../constants';
import { useCart } from '../CartContext';

interface CustomOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

const SIZE_OPTIONS: CustomOption[] = [
  { id: 'sz1', name: 'Individual (250g)', price: 0 },
  { id: 'sz2', name: 'Família (500g)', price: 25.00 },
];

const SIDE_OPTIONS: CustomOption[] = [
  { 
    id: 's1', 
    name: 'Arroz Branco', 
    price: 0, 
    description: 'Arroz branco soltinho, cozido com alho e cebola.',
    image: 'https://picsum.photos/seed/rice/200/200'
  },
  { 
    id: 's2', 
    name: 'Batata Frita Canoa', 
    price: 8.50, 
    description: 'Batatas crocantes em corte especial com sal e alecrim.',
    image: 'https://picsum.photos/seed/fries/200/200'
  },
  { 
    id: 's3', 
    name: 'Salada da Casa', 
    price: 6.00, 
    description: 'Mix de folhas verdes, tomates cereja e molho de mostarda e mel.',
    image: 'https://picsum.photos/seed/salad/200/200'
  },
  { 
    id: 's4', 
    name: 'Farofa Especial', 
    price: 7.00, 
    description: 'Farofa crocante na manteiga com pedaços de bacon e ovos.',
    image: 'https://picsum.photos/seed/farofa/200/200'
  },
];

const TOPPING_OPTIONS: CustomOption[] = [
  { id: 't1', name: 'Parmesão Ralado', price: 4.50 },
  { id: 't2', name: 'Azeite de Trufas', price: 12.00 },
  { id: 't3', name: 'Manjericão Fresco', price: 2.00 },
];

const ADDON_OPTIONS: CustomOption[] = [
  { id: 'a1', name: 'Queijo Extra', price: 6.00 },
  { id: 'a2', name: 'Bacon Crocante', price: 8.50 },
  { id: 'a3', name: 'Ovo Frito Gema Mole', price: 4.00 },
];

const DishDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const dish = DISHES.find(d => d.id === id) || DISHES[0];
  
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>(SIZE_OPTIONS[0].id);
  const [selectedSide, setSelectedSide] = useState<string>(SIDE_OPTIONS[0].id);
  const [selectedToppings, setSelectedToppings] = useState<Set<string>>(new Set());
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [cookingPreference, setCookingPreference] = useState('Ao Ponto');
  const [isPriceUpdating, setIsPriceUpdating] = useState(false);

  // Reactive price calculation
  const unitPrice = useMemo(() => {
    let total = dish.price;
    
    const size = SIZE_OPTIONS.find(s => s.id === selectedSize);
    if (size) total += size.price;

    const side = SIDE_OPTIONS.find(s => s.id === selectedSide);
    if (side) total += side.price;
    
    selectedToppings.forEach(id => {
      const opt = TOPPING_OPTIONS.find(o => o.id === id);
      if (opt) total += opt.price;
    });

    selectedAddons.forEach(addonId => {
      const addon = ADDON_OPTIONS.find(a => a.id === addonId);
      if (addon) total += addon.price;
    });
    
    return total;
  }, [dish.price, selectedSize, selectedSide, selectedToppings, selectedAddons]);

  const totalPrice = unitPrice * quantity;

  // Trigger animation when total price changes
  useEffect(() => {
    setIsPriceUpdating(true);
    const timer = setTimeout(() => setIsPriceUpdating(false), 200);
    return () => clearTimeout(timer);
  }, [totalPrice]);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    const sizeName = SIZE_OPTIONS.find(s => s.id === selectedSize)?.name;
    const sideName = SIDE_OPTIONS.find(s => s.id === selectedSide)?.name;
    const toppingsNames = Array.from(selectedToppings).map(id => TOPPING_OPTIONS.find(t => t.id === id)?.name);
    const addonsNames = Array.from(selectedAddons).map(id => ADDON_OPTIONS.find(a => a.id === id)?.name);
    
    const optionsSummary = [
      sizeName ? `Tam: ${sizeName}` : null,
      `Ponto: ${cookingPreference}`,
      sideName ? `Acomp: ${sideName}` : null,
      toppingsNames.length > 0 ? `Tops: ${toppingsNames.join(', ')}` : null,
      addonsNames.length > 0 ? `Extras: ${addonsNames.join(', ')}` : null
    ].filter(Boolean).join(' | ');

    const customizedDish = {
      ...dish,
      price: unitPrice
    };

    addToCart(customizedDish, quantity, `${optionsSummary}${notes ? ' | Obs: ' + notes : ''}`);
    navigate(-1);
  };

  return (
    <div className="flex-1 flex flex-col bg-background relative h-full">
      {/* Header Image */}
      <div className="relative h-80 overflow-hidden shrink-0">
        <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
        <div className="absolute top-8 left-4 right-4 flex justify-between z-10">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="size-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="size-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center transition-transform active:scale-90 shadow-lg">
              <span className="material-symbols-outlined font-bold">favorite</span>
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-10 bg-background rounded-t-[2.5rem]"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 -mt-4 pb-48 no-scrollbar">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">{dish.name}</h1>
          <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[18px] fill-current">star</span>
              <span>4.9</span>
            </div>
            <div className="size-1 rounded-full bg-gray-200"></div>
            <span>20-30 min</span>
            <div className="size-1 rounded-full bg-gray-200"></div>
            <span className="text-red-500">{dish.calories || 450} kcal</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-8">{dish.description}</p>

        <div className="space-y-10">
          {/* Size Selection */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Escolha o Tamanho</h3>
              <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">Obrigatório</span>
            </div>
            <div className="space-y-3">
              {SIZE_OPTIONS.map((s) => (
                <label 
                  key={s.id} 
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedSize === s.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-50 bg-white shadow-sm'}`}
                >
                  <div>
                    <p className={`font-bold text-sm ${selectedSize === s.id ? 'text-primary' : 'text-gray-900'}`}>{s.name}</p>
                    {s.price > 0 && <p className="text-xs text-gray-400 font-bold mt-0.5">+ R$ {s.price.toFixed(2).replace('.', ',')}</p>}
                  </div>
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center ${selectedSize === s.id ? 'border-primary' : 'border-gray-200'}`}>
                    {selectedSize === s.id && <div className="size-2.5 rounded-full bg-primary"></div>}
                  </div>
                  <input type="radio" className="hidden" name="size" checked={selectedSize === s.id} onChange={() => setSelectedSize(s.id)} />
                </label>
              ))}
            </div>
          </section>

          {/* Side Dishes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Acompanhamento</h3>
              <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">Obrigatório</span>
            </div>
            <div className="space-y-4">
              {SIDE_OPTIONS.map((s) => (
                <label 
                  key={s.id} 
                  className={`flex gap-4 p-3 rounded-3xl border-2 transition-all cursor-pointer ${selectedSide === s.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-50 bg-white shadow-sm'}`}
                >
                  <img src={s.image} alt={s.name} className="size-16 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <p className={`font-bold text-sm truncate ${selectedSide === s.id ? 'text-primary' : 'text-gray-900'}`}>{s.name}</p>
                      <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedSide === s.id ? 'border-primary' : 'border-gray-200'}`}>
                        {selectedSide === s.id && <div className="size-2.5 rounded-full bg-primary"></div>}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{s.description}</p>
                    <p className={`text-xs font-bold mt-1 ${s.price === 0 ? 'text-green-600' : 'text-gray-500'}`}>
                      {s.price === 0 ? 'Grátis' : `+ R$ ${s.price.toFixed(2).replace('.', ',')}`}
                    </p>
                  </div>
                  <input type="radio" className="hidden" name="side" checked={selectedSide === s.id} onChange={() => setSelectedSide(s.id)} />
                </label>
              ))}
            </div>
          </section>

          {/* Toppings */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Finalização</h3>
              <span className="bg-gray-100 text-gray-400 text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">Opcional</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TOPPING_OPTIONS.map((t) => (
                <label 
                  key={t.id} 
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedToppings.has(t.id) ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white shadow-sm'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedToppings.has(t.id) ? 'bg-primary border-primary text-white' : 'border-gray-200 bg-white text-transparent'}`}>
                      <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${selectedToppings.has(t.id) ? 'text-primary' : 'text-gray-900'}`}>{t.name}</p>
                      {t.price > 0 && <p className="text-[10px] text-gray-400 font-bold">R$ {t.price.toFixed(2).replace('.', ',')}</p>}
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedToppings.has(t.id)} onChange={() => toggleTopping(t.id)} />
                </label>
              ))}
            </div>
          </section>

          {/* Add-ons */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-900">Turbine seu prato</h3>
              <span className="bg-gray-100 text-gray-400 text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">Opcional</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {ADDON_OPTIONS.map((a) => (
                <label 
                  key={a.id} 
                  className={`flex items-center justify-between p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedAddons.has(a.id) ? 'border-primary bg-primary/5' : 'border-gray-50 bg-white shadow-sm'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedAddons.has(a.id) ? 'bg-primary border-primary text-white' : 'border-gray-200 bg-white text-transparent'}`}>
                      <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${selectedAddons.has(a.id) ? 'text-primary' : 'text-gray-900'}`}>{a.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">+ R$ {a.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                  </div>
                  <input type="checkbox" className="hidden" checked={selectedAddons.has(a.id)} onChange={() => toggleAddon(a.id)} />
                </label>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section className="mb-8">
            <h3 className="text-lg font-black text-gray-900 mb-4">Alguma observação?</h3>
            <textarea 
              className="w-full p-5 rounded-3xl bg-white border-2 border-gray-50 focus:border-primary focus:ring-0 text-sm min-h-[120px] resize-none shadow-sm transition-all"
              placeholder="Ex: Sem cebola, molho à parte, etc..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-5 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-3xl h-16 px-3">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="size-10 flex items-center justify-center rounded-2xl bg-white shadow-sm text-gray-900 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="w-10 text-center font-black text-lg text-gray-900">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="size-10 flex items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
          <button 
            onClick={handleAdd}
            className={`flex-1 h-16 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-widest flex justify-between items-center px-8 shadow-2xl shadow-primary/30 transition-all hover:brightness-105 active:scale-95 ${isPriceUpdating ? 'scale-[1.02] brightness-110' : ''}`}
          >
            <span>Adicionar</span>
            <span className={`text-base transition-transform duration-200 ${isPriceUpdating ? 'scale-110' : 'scale-100'}`}>
              R$ {totalPrice.toFixed(2).replace('.', ',')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
