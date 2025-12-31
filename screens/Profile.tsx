
import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';

const Profile: React.FC = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-4 flex justify-center items-center border-b border-gray-100 bg-white sticky top-0 z-50">
        <h1 className="text-lg font-bold text-gray-900">Meu Perfil</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-28 space-y-8 no-scrollbar">
        {/* User Header */}
        <section className="flex flex-col items-center pt-4">
          <div className="relative mb-4 group cursor-pointer">
            <div className="size-28 rounded-full bg-cover shadow-xl border-4 border-white transition-transform group-hover:scale-105 duration-300" style={{ backgroundImage: `url(https://picsum.photos/seed/user/300/300)` }}></div>
            <button className="absolute bottom-1 right-1 size-9 bg-primary rounded-full border-2 border-white text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <h2 className="text-2xl font-black text-gray-900">Maria Silva</h2>
          <p className="text-gray-400 font-medium">maria.silva@email.com</p>
          <div className="mt-4 flex gap-2">
            <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Cliente VIP</span>
            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">12 Pedidos</span>
          </div>
        </section>

        {/* Account Section */}
        <section className="space-y-6">
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Gerenciar Conta</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {[
                { icon: 'person', label: 'Meus Dados', sub: 'Nome, CPF, Telefone' },
                { icon: 'location_on', label: 'Meus Endereços', sub: 'Casa, Trabalho, Outros' },
                { icon: 'credit_card', label: 'Formas de Pagamento', sub: 'Visa **** 4829' },
                { icon: 'shield', label: 'Segurança', sub: 'Senha e biometria' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left group transition-colors">
                  <div className="size-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.sub}</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1">chevron_right</span>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Preferências do App</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {/* Notifications Toggle */}
              <div className="flex items-center gap-4 p-4">
                <div className="size-10 rounded-2xl bg-orange-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">notifications</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Notificações Push</p>
                  <p className="text-[10px] text-gray-400 font-medium">Alertas de entrega e cupons</p>
                </div>
                <button 
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${pushEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <div className={`size-4 bg-white rounded-full shadow-sm transition-transform ${pushEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Email Toggle */}
              <div className="flex items-center gap-4 p-4">
                <div className="size-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Novidades por E-mail</p>
                  <p className="text-[10px] text-gray-400 font-medium">Resumo semanal e ofertas</p>
                </div>
                <button 
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${emailEnabled ? 'bg-primary' : 'bg-gray-200'}`}
                >
                  <div className={`size-4 bg-white rounded-full shadow-sm transition-transform ${emailEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Theme Selector (Mock) */}
              <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left group transition-colors">
                <div className="size-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <span className="material-symbols-outlined text-[22px]">dark_mode</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">Tema do App</p>
                  <p className="text-[10px] text-gray-400 font-medium">Atualmente: Claro</p>
                </div>
                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-all">expand_more</span>
              </button>
            </div>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Suporte e Legal</h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {[
                { icon: 'help', label: 'Central de Ajuda', external: true },
                { icon: 'article', label: 'Termos de Uso', external: true },
                { icon: 'privacy_tip', label: 'Política de Privacidade', external: true },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 text-left group transition-colors">
                  <div className="size-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-gray-200 transition-colors">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <p className="flex-1 font-bold text-gray-900 text-sm">{item.label}</p>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-all">
                    {item.external ? 'open_in_new' : 'chevron_right'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Logout & Footer */}
        <div className="pt-4 space-y-4">
          <button className="w-full h-14 bg-white rounded-2xl border border-red-50 text-red-500 font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 transition-colors active:scale-[0.98]">
            <span className="material-symbols-outlined">logout</span>
            Sair da conta
          </button>
          <div className="flex flex-col items-center gap-1 opacity-40">
            <p className="text-[10px] font-black tracking-widest uppercase">Sabor da Vila Delivery</p>
            <p className="text-[9px] font-bold">Versão 4.2.0 (Build 192)</p>
          </div>
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
};

export default Profile;
