
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';
import BottomNav from '../components/BottomNav';

// Haversine formula to calculate distance in KM
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [userCoords, setUserCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setIsLoadingNearby(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoadingNearby(false);
      },
      () => {
        setIsLoadingNearby(false);
      },
      { timeout: 5000 }
    );
  };

  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANTS];
    
    // Se temos coordenadas, calculamos a distância para todos
    if (userCoords) {
      list = list.map(res => {
        const dist = calculateDistance(userCoords.lat, userCoords.lng, res.location.lat, res.location.lng);
        return { ...res, computedDistance: dist };
      });

      // Tentamos filtrar por proximidade (15km)
      const nearby = list.filter(res => (res as any).computedDistance <= 15);
      
      // Se houver restaurantes perto, mostramos apenas esses e ordenamos por distância
      // Se não houver nenhum perto (ex: user está em outro país), mostramos todos
      if (nearby.length > 0) {
        list = nearby.sort((a, b) => (a as any).computedDistance - (b as any).computedDistance);
      }
    }

    // Filtro de pesquisa (sempre aplicado)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(res => 
        res.name.toLowerCase().includes(q) || 
        res.category.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [userCoords, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
      <header className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-0.5">
             <span className="text-xl font-black text-primary tracking-tight">moz</span>
             <span className="text-xl font-black text-secondary tracking-tight">delivery</span>
          </div>
          <button className="relative p-3 rounded-full bg-white shadow-sm" onClick={() => navigate('/notifications')}>
            <span className="material-symbols-outlined text-gray-900">shopping_bag</span>
          </button>
        </div>

        <div className="mb-6">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider ml-1">Entregar em</span>
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleGetLocation}>
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">
                {userCoords ? 'Minha Localização' : 'Definir endereço'}
              </span>
              <span className="material-symbols-outlined text-gray-300 text-sm">expand_more</span>
            </div>
        </div>

        <div className="flex w-full items-center rounded-2xl h-14 bg-white shadow-sm px-4 mb-2 border border-gray-50">
          <span className="material-symbols-outlined text-primary pr-3">search</span>
          <input 
            type="text" 
            placeholder="O que vamos comer hoje?" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-semibold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="px-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900 tracking-tight">
            {userCoords && filteredRestaurants.some(r => (r as any).computedDistance <= 15) 
              ? 'Próximos de ti' 
              : 'Explorar Restaurantes'}
          </h2>
          <button className="text-[10px] font-black text-primary uppercase tracking-widest">Ver Tudo</button>
        </div>
        
        {isLoadingNearby ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white rounded-3xl animate-pulse flex flex-col p-4 gap-4">
                <div className="flex-1 bg-gray-100 rounded-2xl"></div>
                <div className="h-6 w-1/2 bg-gray-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredRestaurants.map(res => (
              <div 
                key={res.id} 
                className="flex flex-col bg-white rounded-3xl shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-all border border-gray-50 group"
                onClick={() => navigate(`/restaurant/${res.id}`)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-primary flex items-center gap-1 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                    {res.rating}
                  </div>
                  {(res as any).computedDistance && (res as any).computedDistance <= 50 && (
                    <div className="absolute bottom-3 left-3 bg-secondary text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {(res as any).computedDistance.toFixed(1)} km
                    </div>
                  )}
                  {res.isVerified && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white p-1 rounded-full shadow-lg">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight truncate">{res.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">{res.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-gray-900">{res.deliveryTime}</p>
                    <p className="text-[9px] text-secondary font-black uppercase tracking-tighter">Entrega {res.deliveryFee}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-12 text-center flex flex-col items-center border-2 border-dashed border-gray-100">
            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">restaurant_menu</span>
            <h4 className="font-black text-gray-900 mb-1">Nenhum resultado</h4>
            <p className="text-sm text-gray-400 font-medium">Tenta pesquisar por outro nome ou categoria.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-primary font-black text-[10px] uppercase tracking-widest"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </div>
      <BottomNav active="home" />
    </div>
  );
};

export default Home;
