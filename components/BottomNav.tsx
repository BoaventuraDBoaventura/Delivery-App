
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  active: 'home' | 'search' | 'orders' | 'profile';
}

const BottomNav: React.FC<BottomNavProps> = ({ active }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-lg border-t border-gray-100 pt-2 pb-6 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-40">
      <div className="flex justify-between items-center h-12">
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center gap-1 ${active === 'home' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'home' ? 'fill-current' : ''}`}>home</span>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button 
          className={`flex flex-col items-center justify-center gap-1 ${active === 'search' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className="material-symbols-outlined text-[28px]">search</span>
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button 
          onClick={() => navigate('/orders')}
          className={`flex flex-col items-center justify-center gap-1 ${active === 'orders' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'orders' ? 'fill-current' : ''}`}>receipt_long</span>
          <span className="text-[10px] font-medium">Pedidos</span>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center gap-1 ${active === 'profile' ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-[28px] ${active === 'profile' ? 'fill-current' : ''}`}>person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
