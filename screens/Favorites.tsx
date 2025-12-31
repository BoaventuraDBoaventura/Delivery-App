
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'res' | 'dish'>('res');

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full flex items-center justify-center text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="text-lg font-bold text-gray-900">Favoritos</h1>
        <button className="text-primary font-bold text-sm">Editar</button>
      </header>

      <div className="px-5 py-4">
        <div className="flex h-12 bg-gray-100 rounded-full p-1">
          <button 
            onClick={() => setTab('res')}
            className={`flex-1 rounded-full font-bold text-xs transition-all ${tab === 'res' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
          >
            Restaurantes
          </button>
          <button 
            onClick={() => setTab('dish')}
            className={`flex-1 rounded-full font-bold text-xs transition-all ${tab === 'dish' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
          >
            Pratos
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {RESTAURANTS.map(res => (
          <div key={res.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="size-20 rounded-xl bg-cover" style={{ backgroundImage: `url(${res.logo})` }}></div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 truncate">{res.name}</h3>
                <span className="material-symbols-outlined text-primary fill-current">favorite</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-primary mt-1">
                <span className="material-symbols-outlined text-[12px] fill-current">star</span>
                <span>{res.rating}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-400">{res.category.split('•')[0]}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-gray-50 rounded text-[10px] text-gray-500 font-bold">{res.deliveryTime}</span>
                <span className="text-[10px] text-green-600 font-bold">Frete Grátis</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
