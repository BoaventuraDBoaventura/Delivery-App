
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

declare const L: any;

const RestaurantRegistration: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [coords, setCoords] = useState<{lat: number, lng: number}>({ lat: -23.5617, lng: -46.6558 });
  const [address, setAddress] = useState('Clique no mapa para definir o local');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('registration-map', {
        center: [coords.lat, coords.lng],
        zoom: 15,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      markerRef.current = L.marker([coords.lat, coords.lng], {
        draggable: true,
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: #ec7f13; width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"><span class="material-symbols-outlined" style="transform: rotate(45deg); color: white; font-size: 20px;">storefront</span></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 40]
        })
      }).addTo(map);

      map.on('click', (e: any) => {
        const { lat, lng } = e.latlng;
        markerRef.current.setLatLng([lat, lng]);
        setCoords({ lat, lng });
        updateAddress(lat, lng);
      });

      markerRef.current.on('dragend', (e: any) => {
        const { lat, lng } = e.target.getLatLng();
        setCoords({ lat, lng });
        updateAddress(lat, lng);
      });

      mapRef.current = map;
    }
  }, []);

  const updateAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      setAddress(data.display_name || 'Endereço não encontrado');
    } catch (e) {
      setAddress(`Coord: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const newPos = [latitude, longitude];
      mapRef.current.setView(newPos, 17);
      markerRef.current.setLatLng(newPos);
      setCoords({ lat: latitude, lng: longitude });
      updateAddress(latitude, longitude);
    });
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Restaurante cadastrado com sucesso! Aguarde aprovação.');
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-4 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Cadastrar Restaurante</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-10">
        {/* Logo Selection Section */}
        <section className="flex flex-col items-center gap-4">
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Logo do Restaurante</h3>
          <div 
            onClick={handleLogoClick}
            className="relative size-32 group cursor-pointer"
          >
            <div className={`w-full h-full rounded-full border-4 border-white shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${logoUrl ? 'bg-white' : 'bg-gray-50 border-dashed border-gray-200'}`}>
              {logoUrl ? (
                <img src={logoUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-300">
                  <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                </div>
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
              </div>
            </div>
            {/* Floating add button if no logo */}
            {!logoUrl && (
              <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-2 border-white text-white flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-sm">add</span>
              </div>
            )}
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase text-center max-w-[200px]">
            Clique para selecionar uma imagem (PNG, JPG)
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nome do Estabelecimento</label>
            <input type="text" placeholder="Ex: Cantina da Vila" className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Categoria</label>
            <div className="relative">
              <select className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm appearance-none focus:ring-2 focus:ring-primary/20 transition-all">
                <option>Italiana</option>
                <option>Lanches</option>
                <option>Japonesa</option>
                <option>Brasileira</option>
                <option>Vegana</option>
                <option>Doces & Bolos</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Localização no Mapa</h3>
            <button onClick={handleUseCurrentLocation} className="text-[10px] font-black text-primary uppercase flex items-center gap-1 hover:bg-primary/5 px-2 py-1 rounded-full transition-colors">
              <span className="material-symbols-outlined text-sm">my_location</span>
              Usar GPS
            </button>
          </div>
          
          <div id="registration-map" className="h-64 w-full rounded-3xl shadow-inner border border-gray-100 z-0 overflow-hidden"></div>
          
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-3 items-start animate-in slide-in-from-bottom-2">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <div className="flex-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">Endereço Identificado</p>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{address}</p>
            </div>
          </div>
        </section>

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="material-symbols-outlined">check_circle</span>
              Finalizar Cadastro
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RestaurantRegistration;
