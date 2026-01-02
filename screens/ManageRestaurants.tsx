
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../constants';

const ManageRestaurants: React.FC = () => {
  const navigate = useNavigate();

  // Simulamos que os primeiros 2 restaurantes pertencem a este utilizador
  // (Excluindo o Costa do Sol que foi removido das constantes)
  const myRestaurants = RESTAURANTS.slice(0, 2);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Header com o Botão de Voltar Corrigido */}
      <header className="sticky top-0 z-[100] bg-white border-b border-gray-100 p-4 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleBack}
            className="size-11 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 active:scale-90 transition-all cursor-pointer relative z-[110]"
            aria-label="Voltar"
          >
            <span className="material-symbols-outlined font-black text-2xl">arrow_back</span>
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-lg font-black text-gray-900 leading-tight">Meus Restaurantes</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Gestão de Negócios</p>
          </div>
        </div>

        {/* Botão Novo Restaurante no Topo */}
        <button 
          type="button"
          onClick={() => navigate('/restaurant-registration')}
          className="h-10 px-4 bg-primary text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Novo
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-10">
        {/* Intro Card - Analytics Simulado */}
        <div className="bg-primary/5 border border-primary/10 p-6 rounded-[2rem] flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl font-bold">insights</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Resumo de Atividade</h3>
            <p className="text-[10px] text-gray-500 font-medium mt-1">Tens {myRestaurants.length} estabelecimentos ativos.</p>
          </div>
        </div>

        {/* Restaurants List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Meus Estabelecimentos</h3>
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{myRestaurants.length} no total</span>
          </div>
          
          <div className="space-y-3">
            {myRestaurants.map((res, index) => (
              <div 
                key={res.id}
                className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-4 group active:scale-[0.98] transition-all cursor-pointer hover:border-primary/20"
                onClick={() => navigate('/restaurant-dashboard')}
              >
                <div className="size-16 rounded-2xl overflow-hidden border border-gray-50 shadow-inner shrink-0">
                  <img src={res.logo} alt={res.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-gray-900 text-sm truncate">{res.name}</h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${
                      index === 0 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {index === 0 ? 'Ativo' : 'Pendente'}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                    {res.category.split('•')[0]}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                      <span className="material-symbols-outlined text-[14px] fill-current text-yellow-400">star</span>
                      {res.rating}
                    </div>
                    <div className="size-1 bg-gray-200 rounded-full"></div>
                    <div className="text-[9px] font-black text-primary uppercase tracking-widest">
                      Gerir Painel
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-200 group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            ))}

            {myRestaurants.length === 0 && (
              <div className="py-20 flex flex-col items-center text-center opacity-30">
                <span className="material-symbols-outlined text-6xl mb-4">storefront</span>
                <p className="font-black text-gray-900 uppercase tracking-widest text-xs">Nenhum restaurante</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">Começa a vender agora mesmo!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurants;
