
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS, DISHES } from '../constants';
import { useCart } from '../CartContext';

const RestaurantProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subtotal, cart } = useCart();
  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];
  
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(restaurant.tags));

  // Filtrar pratos específicos deste restaurante
  const restaurantDishes = DISHES.filter(d => d.restaurantId === id);

  const toggleCategory = (tag: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  return (
    <div className="flex-1 overflow-y-auto relative bg-background h-full no-scrollbar scroll-smooth">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16 shadow-sm">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex-1 px-4 text-center overflow-hidden">
          <h1 className="font-extrabold text-gray-900 truncate text-[10px] uppercase tracking-[0.15em]">Restaurante</h1>
          <h2 className="text-sm font-bold text-gray-500 truncate">{restaurant.name}</h2>
        </div>
        <div className="size-10"></div>
      </header>

      <div className="relative">
        <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }} />
        <div className="px-5 -mt-10 pb-2">
          <div className="bg-white rounded-3xl shadow-xl p-5 flex flex-col items-center text-center border border-gray-100 relative">
            <div className="absolute -top-10 bg-white p-1 rounded-full shadow-md"><img src={restaurant.logo} className="h-20 w-20 rounded-full border border-gray-100" /></div>
            <div className="mt-10 w-full">
              <h1 className="text-2xl font-black text-gray-900 mb-1">{restaurant.name}</h1>
              <p className="text-sm text-primary font-bold mb-4">{restaurant.category}</p>
              <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button onClick={() => setActiveTab('menu')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}>Menu</button>
                <button onClick={() => setActiveTab('reviews')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}>Reviews</button>
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'info' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}>Info</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-32 px-5 mt-6">
        {activeTab === 'menu' && restaurant.tags.map((tag) => {
          // Filtrar itens da seção específica dentro dos pratos deste restaurante
          const sectionItems = tag === 'Destaques' 
            ? restaurantDishes.filter(d => d.isPopular) 
            : restaurantDishes.filter(d => d.category === tag);
            
          if (sectionItems.length === 0) return null;
          const isExpanded = expandedCategories.has(tag);
          
          return (
            <div key={tag} className="mb-4">
              <button onClick={() => toggleCategory(tag)} className="w-full flex items-center justify-between py-4 bg-white px-5 rounded-2xl shadow-sm border border-gray-50 mb-2">
                <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">{tag}</h2>
                <span className={`material-symbols-outlined text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {isExpanded && (
                <div className="space-y-3">
                  {sectionItems.map(dish => (
                    <div key={dish.id} onClick={() => navigate(`/dish/${dish.id}`)} className="flex bg-white p-4 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                      <div className="flex-1 pr-4">
                        <h3 className="font-bold text-gray-900 mb-1">{dish.name}</h3>
                        <p className="text-[10px] text-gray-400 line-clamp-2 mb-2 font-medium">{dish.description}</p>
                        <span className="font-black text-primary text-sm">{dish.price.toFixed(2).replace('.', ',')} MT</span>
                      </div>
                      <div className="size-20 rounded-2xl overflow-hidden bg-gray-50 shrink-0"><img src={dish.image} className="w-full h-full object-cover" /></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {activeTab === 'info' && (
          <div className="space-y-6">
            <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined">location_on</span></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Maputo Local</h4>
                  <p className="text-xs text-gray-500 mt-1 font-medium">{restaurant.location.address}</p>
                  <a href={`https://www.openstreetmap.org/search?query=${restaurant.location.address}`} target="_blank" className="text-[10px] font-black text-primary uppercase mt-2 block border-b border-primary/20 w-max tracking-widest">Abrir no Mapa</a>
                </div>
              </div>
            </section>
            
            <div className="bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden h-64">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 src={`https://www.openstreetmap.org/export/embed.html?bbox=${restaurant.location.lng-0.005}%2C${restaurant.location.lat-0.005}%2C${restaurant.location.lng+0.005}%2C${restaurant.location.lat+0.005}&layer=mapnik&marker=${restaurant.location.lat}%2C${restaurant.location.lng}`}
                 className="rounded-[2rem]"
               />
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 w-full max-w-md px-5 z-50">
          <button onClick={() => navigate('/cart')} className="w-full bg-primary text-white h-16 rounded-3xl shadow-2xl flex justify-between items-center px-8 transition-all active:scale-95">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 size-8 rounded-xl flex items-center justify-center font-black text-sm">{cart.length}</div>
              <span className="font-black text-xs uppercase tracking-widest">Ver Cesta</span>
            </div>
            <span className="font-black text-lg">{subtotal.toFixed(2).replace('.', ',')} MT</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
