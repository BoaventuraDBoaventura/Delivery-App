
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

type SubPage = 'main' | 'personal_data' | 'addresses' | 'payments' | 'security';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeSubPage, setActiveSubPage] = useState<SubPage>('main');
  
  // Simulação de utilizador com papel
  const [userData, setUserData] = useState({
    name: 'Amina Selemane',
    email: 'amina.sele@mail.mz',
    phone: '+258 84 123 4567',
    nuit: '123456789',
    role: 'customer' // 'customer', 'driver', 'owner', 'super_admin'
  });

  const handleSaveData = () => {
    alert('Dados salvos com sucesso!');
    setActiveSubPage('main');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const renderPersonalData = () => (
    <div className="flex-1 flex flex-col bg-background animate-in slide-in-from-right duration-300">
      <header className="p-4 flex items-center bg-white border-b border-gray-100">
        <button onClick={() => setActiveSubPage('main')} className="size-10 flex items-center justify-center rounded-full text-gray-900">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="flex-1 text-center font-bold text-gray-900 pr-10">Meus Dados</h2>
      </header>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nome Completo</label>
            <input type="text" value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Telemóvel</label>
            <input type="text" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <button onClick={handleSaveData} className="w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all">
          Salvar Alterações
        </button>
      </div>
    </div>
  );

  if (activeSubPage === 'personal_data') return renderPersonalData();

  const handleMenuClick = (id: string) => {
    if (id === 'payments') {
      navigate('/payment-history');
    } else if (id === 'manage_restaurants') {
      navigate('/manage-restaurants');
    } else {
      setActiveSubPage(id as SubPage);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-4 flex justify-center items-center border-b border-gray-100 bg-white sticky top-0 z-50">
        <h1 className="text-lg font-bold text-gray-900">Meu Perfil</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-28 space-y-8 no-scrollbar">
        <section className="flex flex-col items-center pt-4">
          <div className="relative mb-4 group cursor-pointer">
            <div className="size-28 rounded-full bg-cover shadow-xl border-4 border-white" style={{ backgroundImage: `url(https://picsum.photos/seed/amina/300/300)` }}></div>
            <button onClick={() => setActiveSubPage('personal_data')} className="absolute bottom-1 right-1 size-9 bg-primary rounded-full border-2 border-white text-white flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-sm">edit</span></button>
          </div>
          <h2 className="text-2xl font-black text-gray-900">{userData.name}</h2>
          <p className="text-gray-400 font-medium">{userData.email}</p>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Áreas de Acesso rápido</h3>
          <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => navigate('/restaurant-dashboard')}
               className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left flex flex-col gap-3 group active:bg-primary/5 transition-all"
             >
               <div className="size-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                 <span className="material-symbols-outlined">dashboard</span>
               </div>
               <div>
                 <p className="font-bold text-gray-900 text-xs">Painel Vendedor</p>
                 <p className="text-[9px] text-gray-400 font-medium">Gestão Direta</p>
               </div>
             </button>
             <button 
               onClick={() => navigate('/driver-dashboard')}
               className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-left flex flex-col gap-3 group active:bg-secondary/5 transition-all"
             >
               <div className="size-10 rounded-2xl bg-secondary/5 text-secondary flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all">
                 <span className="material-symbols-outlined">moped</span>
               </div>
               <div>
                 <p className="font-bold text-gray-900 text-xs">Modo Entregador</p>
                 <p className="text-[9px] text-gray-400 font-medium">Ver Entregas</p>
               </div>
             </button>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Gerenciar Conta</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {[
                { id: 'personal_data', icon: 'person', label: 'Meus Dados', sub: 'Editar informações básicas' },
                { id: 'addresses', icon: 'location_on', label: 'Endereços', sub: 'Maputo, Polana' },
                { id: 'payments', icon: 'payments', label: 'Pagamentos', sub: 'M-Mola / E-Pesa' },
                { id: 'manage_restaurants', icon: 'storefront', label: 'Meus Restaurantes', sub: 'Gerir e registar negócios' },
              ].map((item) => (
                <button key={item.id} onClick={() => handleMenuClick(item.id)} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left group">
                  <div className="size-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/5 group-hover:text-primary transition-all"><span className="material-symbols-outlined text-[22px]">{item.icon}</span></div>
                  <div className="flex-1"><p className="font-bold text-gray-900 text-sm">{item.label}</p><p className="text-[10px] text-gray-400 font-medium">{item.sub}</p></div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-all">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="pt-4 space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full h-14 bg-white rounded-2xl border border-red-50 text-red-500 font-bold flex items-center justify-center gap-2 active:bg-red-50 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span> Sair da conta
          </button>
        </div>
      </div>
      <BottomNav active="profile" />
    </div>
  );
};

export default Profile;
