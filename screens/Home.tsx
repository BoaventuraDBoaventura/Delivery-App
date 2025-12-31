
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';
import BottomNav from '../components/BottomNav';
import { GoogleGenAI } from "@google/genai";

interface NearbyPlace {
  id: string;
  name: string;
  rating: string;
  category: string;
  deliveryTime: string;
  image: string;
  uri?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt');

  useEffect(() => {
    // Check for existing permission status
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((status) => {
        setPermissionStatus(status.state as any);
        if (status.state === 'granted') {
          handleGetLocation();
        }
        status.onchange = () => {
          setPermissionStatus(status.state as any);
          if (status.state === 'granted') handleGetLocation();
        };
      });
    } else {
      setPermissionStatus('unsupported');
    }
  }, []);

  const fetchNearbyRestaurants = async (lat: number, lng: number) => {
    setIsLoadingNearby(true);
    setLocationError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite-latest",
        contents: "Liste 5 bons restaurantes reais próximos a esta localização. Para cada um, forneça o nome, o tipo de culinária e uma nota de avaliação aproximada. Formate como uma lista clara.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: lat,
                longitude: lng
              }
            }
          }
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && chunks.length > 0) {
        const places: NearbyPlace[] = chunks
          .filter(chunk => chunk.maps)
          .map((chunk, index) => ({
            id: `nearby-${index}`,
            name: chunk.maps?.title || "Restaurante",
            rating: (4 + Math.random()).toFixed(1),
            category: "Restaurante Local",
            deliveryTime: `${20 + Math.floor(Math.random() * 20)} min`,
            image: `https://picsum.photos/seed/nearby${index}/400/300`,
            uri: chunk.maps?.uri
          }));
        setNearbyPlaces(places);
      }
    } catch (err) {
      console.error("Error fetching nearby places:", err);
      setLocationError("Não foi possível carregar restaurantes próximos.");
    } finally {
      setIsLoadingNearby(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      return;
    }

    setIsLoadingNearby(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionStatus('granted');
        fetchNearbyRestaurants(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setIsLoadingNearby(false);
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionStatus('denied');
          setLocationError("Permissão de localização negada.");
        } else {
          setLocationError("Erro ao obter sua localização.");
        }
      }
    );
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <header className="px-5 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entregar em</span>
            <div className="flex items-center gap-1 text-primary">
              <span className="text-base font-bold text-gray-900 truncate max-w-[200px]">Av. Paulista, 1578</span>
              <span className="material-symbols-outlined text-primary text-xl">expand_more</span>
            </div>
          </div>
          <button className="relative p-3 rounded-full bg-white shadow-sm" onClick={() => navigate('/notifications')}>
            <span className="material-symbols-outlined text-gray-900">shopping_bag</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
          </button>
        </div>

        <div className="flex w-full items-center rounded-xl h-14 bg-white shadow-sm px-4 mb-6">
          <span className="material-symbols-outlined text-primary pr-3">search</span>
          <input 
            type="text" 
            placeholder="Buscar restaurante ou prato" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-medium"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          <button className="shrink-0 flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-white shadow-lg shadow-primary/20 transition-all">
            <span className="material-symbols-outlined text-sm">restaurant</span>
            <span className="text-sm font-bold">Todos</span>
          </button>
          {['Lanches', 'Pizza', 'Japonesa', 'Saudável'].map((cat, i) => (
            <button key={i} className="shrink-0 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-gray-600 border border-gray-100 font-medium text-sm hover:border-primary/30 transition-colors">
              <span className="text-lg">{['🍔', '🍕', '🍣', '🥗'][i]}</span>
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Restaurantes Próximos</h2>
          {permissionStatus === 'granted' && (
            <button onClick={handleGetLocation} className="text-primary text-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">my_location</span>
              Atualizar
            </button>
          )}
        </div>

        {permissionStatus === 'granted' ? (
          <>
            {isLoadingNearby ? (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="shrink-0 w-64 h-48 bg-white rounded-2xl animate-pulse flex flex-col p-3 gap-3 border border-gray-100">
                    <div className="w-full h-24 bg-gray-100 rounded-xl"></div>
                    <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : nearbyPlaces.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
                {nearbyPlaces.map(place => (
                  <a 
                    key={place.id} 
                    href={place.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 w-64 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                      <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-primary flex items-center gap-0.5 shadow-sm">
                        {place.rating} <span className="material-symbols-outlined text-[10px] fill-current">star</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 truncate">{place.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{place.category}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white border border-gray-100 rounded-2xl text-center">
                <p className="text-sm text-gray-500 font-medium">{locationError || "Buscando os melhores sabores perto de você..."}</p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-primary text-4xl">location_on</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Descubra sabores ao seu redor!</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-[240px] leading-relaxed">
              Ative sua localização para encontrarmos os restaurantes mais próximos com entrega super rápida.
            </p>
            <button 
              onClick={handleGetLocation} 
              disabled={isLoadingNearby}
              className="bg-primary text-white font-bold px-8 py-3 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-2"
            >
              {isLoadingNearby ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined text-sm">near_me</span>
              )}
              Ativar Localização
            </button>
            {permissionStatus === 'denied' && (
              <p className="mt-4 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                Acesso bloqueado. Ative nas configurações do navegador.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Restaurantes Populares</h2>
          <button className="text-primary text-sm font-semibold">Ver todos</button>
        </div>

        <div className="flex flex-col gap-6">
          {RESTAURANTS.map(res => (
            <div 
              key={res.id} 
              className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
              onClick={() => navigate(`/restaurant/${res.id}`)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={res.image} alt={res.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold">
                  {res.deliveryTime}
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors" onClick={(e) => {e.stopPropagation();}}>
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{res.name}</h3>
                  <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                    <span className="text-primary text-xs font-bold">{res.rating}</span>
                    <span className="material-symbols-outlined text-primary text-[14px] fill-current">star</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span>{res.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
};

export default Home;
