
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AdminTab = 'overview' | 'partners' | 'users' | 'finance';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  
  const stats = [
    { label: 'Receita Total', value: '1.240.500 MT', trend: '+12%', icon: 'payments', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pedidos/Dia', value: '458', trend: '+5%', icon: 'shopping_cart', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Novos Estafetas', value: '12', trend: '+2', icon: 'moped', color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Restaurantes', value: '84', trend: 'Ativos', icon: 'storefront', color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const recentLogs = [
    { id: 1, event: 'Novo Restaurante', details: 'KFC Matola submeteu documentos', time: '2 min atrás', type: 'info' },
    { id: 2, event: 'Alerta de Fraude', details: 'Tentativa de login múltiplo: User #882', time: '15 min atrás', type: 'warning' },
    { id: 3, event: 'Pagamento Concluído', details: 'Payout semanal: 45 estafetas', time: '1 h atrás', type: 'success' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Header Fixo com Botão Voltar */}
      <header className="p-6 bg-white border-b border-gray-100 flex items-center gap-4 z-50">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-90">
          <span className="material-symbols-outlined font-bold text-gray-900">arrow_back</span>
        </button>
        <div className="flex-1">
           <div className="flex items-center gap-2">
              <span className="size-2 bg-primary rounded-full animate-ping"></span>
              <h1 className="text-xl font-black text-gray-900 tracking-tight leading-tight">Comando Global</h1>
           </div>
           <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">MozDelivery Admin</p>
        </div>
        <button onClick={() => navigate('/profile')} className="size-11 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100 shadow-sm active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-gray-600">person</span>
        </button>
      </header>

      {/* Tabs de Navegação */}
      <nav className="bg-white px-6 border-b border-gray-100 flex gap-6 overflow-x-auto no-scrollbar shrink-0">
        {[
          { id: 'overview', label: 'Dashboard', icon: 'grid_view' },
          { id: 'partners', label: 'Parceiros', icon: 'handshake' },
          { id: 'users', label: 'Utilizadores', icon: 'group' },
          { id: 'finance', label: 'Finanças', icon: 'account_balance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-400'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeTab === tab.id ? 'fill-current' : ''}`}>{tab.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-24">
        
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Gráfico Simulado */}
            <section>
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Crescimento Mensal</h3>
                <span className="text-[10px] font-bold text-secondary">SETEMBRO 2023</span>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="h-32 w-full flex items-end gap-2 px-2">
                  {[40, 65, 45, 90, 55, 75, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        style={{ height: `${h}%` }} 
                        className={`w-full rounded-t-lg transition-all duration-700 ${i === 6 ? 'bg-primary' : 'bg-gray-100 group-hover:bg-primary/20'}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-[8px] font-black text-gray-300 uppercase tracking-widest px-1">
                  <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span><span>Dom</span>
                </div>
              </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(stat => (
                <div key={stat.label} className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-100 group active:scale-95 transition-transform">
                   <div className={`size-10 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                     <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                   </div>
                   <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                   <div className="flex items-baseline gap-1.5">
                      <p className="text-lg font-black text-gray-900 leading-tight">{stat.value}</p>
                      <span className="text-[8px] font-bold text-secondary">{stat.trend}</span>
                   </div>
                </div>
              ))}
            </div>

            {/* Live Logs */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Eventos Críticos</h3>
              <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {recentLogs.map(log => (
                  <div key={log.id} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`size-2 rounded-full mt-2 shrink-0 ${
                      log.type === 'warning' ? 'bg-orange-400' : log.type === 'success' ? 'bg-secondary' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                         <h4 className="font-bold text-gray-900 text-xs">{log.event}</h4>
                         <span className="text-[8px] font-bold text-gray-400 uppercase">{log.time}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 truncate">{log.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
               <button className="flex-1 py-2 bg-white rounded-xl shadow-sm text-[10px] font-black uppercase tracking-widest text-primary">Aprovar (5)</button>
               <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Listagem Geral</button>
            </div>

            <div className="space-y-4">
              {[
                { name: 'KFC Maputo Shopping', type: 'Restaurante', city: 'Maputo', rating: 'Novo' },
                { name: 'Ricardo Mandlate', type: 'Estafeta', city: 'Matola', rating: 'N/A' },
                { name: 'Sabor de Inhambane', type: 'Restaurante', city: 'Inhambane', rating: 'Novo' },
              ].map((partner, i) => (
                <div key={i} className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                      <span className="material-symbols-outlined text-3xl">
                        {partner.type === 'Restaurante' ? 'restaurant' : 'moped'}
                      </span>
                    </div>
                    <div>
                       <h4 className="font-black text-gray-900 text-sm leading-tight">{partner.name}</h4>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{partner.type} • {partner.city}</p>
                    </div>
                  </div>
                  <button className="h-10 px-4 bg-primary/10 text-primary rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all">Analisar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
           <div className="space-y-6 animate-in slide-in-from-right duration-500">
             <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input type="text" placeholder="Procurar utilizador..." className="w-full h-14 bg-white border-none rounded-2xl pl-12 pr-5 text-sm font-bold shadow-sm" />
             </div>
             
             <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {[
                  { name: 'Amina Selemane', role: 'Cliente', email: 'amina@mail.mz' },
                  { name: 'Carlos Macuacua', role: 'Proprietário', email: 'carlos@saborvila.mz' },
                  { name: 'João Estafeta', role: 'Entregador', email: 'joao@moz.delivery' },
                ].map((u, i) => (
                  <div key={i} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                       <div className="size-10 rounded-full bg-gray-100 shrink-0 border border-gray-100"></div>
                       <div className="min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate">{u.name}</h4>
                          <p className="text-[10px] text-gray-400 font-medium truncate">{u.email}</p>
                       </div>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${
                      u.role === 'Cliente' ? 'bg-blue-50 text-blue-500' : u.role === 'Proprietário' ? 'bg-orange-50 text-orange-500' : 'bg-primary/10 text-primary'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                ))}
             </div>
           </div>
        )}

      </div>
      
      {/* Botão de Ação Global */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="size-14 bg-primary text-white rounded-2xl shadow-2xl flex items-center justify-center active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl">campaign</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
