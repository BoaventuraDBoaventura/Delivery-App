
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';
import BottomNav from '../components/BottomNav';
import { GoogleGenAI } from "@google/genai";

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
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
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
        setPermissionStatus('granted');
        setIsLoadingNearby(false);
      },
      () => {
        setPermissionStatus('denied');
        setIsLoadingNearby(false);
      }
    );
  };

  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANTS];
    
    // Proximity Filter: Only show restaurants within 5km if location is available
    if (userCoords) {
      list = list.filter(res => {
        const dist = calculateDistance(userCoords.lat, userCoords.lng, res.location.lat, res.location.lng);
        (res as any).computedDistance = dist;
        return dist <= 5; // 5km limit
      }).sort((a, b) => (a as any).computedDistance - (b as any).computedDistance);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(res => res.name.toLowerCase().includes(q) || res.category.toLowerCase().includes(q));
    }

    return list;
  }, [userCoords, searchQuery]);

  return (
    <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
      <header className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entregar em</span>
            <div className="flex items-center gap-1 text-primary">
              <span className="text-base font-bold text-gray-900 truncate max-w-[200px]">
                {userCoords ? 'Minha Localização Atual' : 'Definir endereço'}
              </span>
              <span className="material-symbols-outlined text-primary text-xl">expand_more</span>
            </div>
          </div>
          <button className="relative p-3 rounded-full bg-white shadow-sm" onClick={() => navigate('/notifications')}>
            <span className="material-symbols-outlined text-gray-900">shopping_bag</span>
          </button>
        </div>

        <div className="flex w-full items-center rounded-xl h-14 bg-white shadow-sm px-4 mb-6">
          <span className="material-symbols-outlined text-primary pr-3">search</span>
          <input 
            type="text" 
            placeholder="Buscar restaurante ou prato" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="px-5 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
          <span>Restaurantes Próximos</span>
          {userCoords && <span className="text-[10px] text-primary font-black uppercase">Raio de 5km</span>}
        </h2>
        
        {isLoadingNearby ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2].map(i => <div key={i} className="h-44 bg-white rounded-2xl animate-pulse"></div>)}
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredRestaurants.map(res => (
              <div 
                key={res.id} 
                className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
                onClick={() => navigate(`/restaurant/${res.id}`)}
              >
                <div className="relative aspect-[16/9]">
                  <img src={res.image} alt={res.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] fill-current">star</span>
                    {res.rating}
                  </div>
                  {(res as any).computedDistance && (
                    <div className="absolute bottom-3 left-3 bg-primary text-white px-2 py-1 rounded-lg text-[9px] font-black uppercase">
                      {(res as any).computedDistance.toFixed(1)} km de você
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{res.name}</h3>
                    <p className="text-xs text-gray-400 font-medium">{res.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-900">{res.deliveryTime}</p>
                    <p className="text-[10px] text-green-600 font-bold uppercase">Frete {res.deliveryFee}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center flex flex-col items-center border border-dashed border-gray-200">
            <span className="material-symbols-outlined text-4xl text-gray-200 mb-4">search_off</span>
            <p className="text-sm text-gray-400 font-bold">Nenhum restaurante encontrado no seu raio de alcance.</p>
          </div>
        )}
      </div>
      <BottomNav active="home" />
    </div>
  );
};

export default Home;
