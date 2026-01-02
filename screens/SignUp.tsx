
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '../types';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const roleNames = {
      customer: 'Cliente',
      driver: 'Entregador',
      owner: 'Restaurante',
      admin: 'Admin',
      super_admin: 'Super Admin'
    };
    alert(`Bem-vindo ao MozDelivery como ${roleNames[role]}!`);
    
    // Simulação de redirecionamento baseado no papel
    if (role === 'owner') navigate('/restaurant-registration');
    else if (role === 'driver') navigate('/driver-dashboard');
    else navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-y-auto no-scrollbar">
      <header className="p-6 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl z-20">
        <button onClick={() => navigate(-1)} className="size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gray-900 active:scale-90 transition-all border border-gray-50">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <div className="flex items-baseline gap-0.5 pr-4">
          <span className="text-xl font-black text-primary tracking-tight">moz</span>
          <span className="text-xl font-black text-secondary tracking-tight">delivery</span>
        </div>
      </header>

      <div className="px-8 pt-4 pb-6">
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Criar Conta</h1>
        <p className="text-gray-500 font-medium">Como deseja usar o MozDelivery?</p>
      </div>

      <div className="px-8 mb-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'customer', icon: 'person', label: 'Cliente' },
            { id: 'driver', icon: 'moped', label: 'Estafeta' },
            { id: 'owner', icon: 'restaurant', label: 'Negócio' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setRole(opt.id as UserRole)}
              className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all gap-2 ${
                role === opt.id 
                ? 'border-primary bg-primary/5 text-primary shadow-lg shadow-primary/10' 
                : 'border-white bg-white text-gray-400'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl ${role === opt.id ? 'fill-current' : ''}`}>{opt.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSignUp} className="px-8 space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nome Completo</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 text-sm font-bold shadow-sm focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
            placeholder="Teu nome completo"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Telemóvel</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 text-sm font-bold shadow-sm focus:border-secondary/20 focus:ring-4 focus:ring-secondary/5 transition-all outline-none" 
            placeholder="+258 84 000 0000"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">E-mail</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 text-sm font-bold shadow-sm focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
            placeholder="exemplo@mail.mz"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Palavra-passe</label>
          <input 
            type="password" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full h-16 bg-white border-2 border-transparent rounded-2xl px-6 text-sm font-bold shadow-sm focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
            placeholder="Mínimo 8 caracteres"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/30 active:scale-[0.97] hover:brightness-110 transition-all mt-4"
        >
          {role === 'owner' ? 'Registar Meu Negócio' : role === 'driver' ? 'Seja um Entregador' : 'Criar Conta Agora'}
        </button>
      </form>

      <div className="py-12 text-center mt-auto">
        <p className="text-sm text-gray-400 font-medium">
          Já fazes parte da família?
          <Link to="/login" className="text-primary font-black uppercase text-xs tracking-[0.15em] ml-2 border-b-2 border-primary/20 pb-0.5">Entrar agora</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
