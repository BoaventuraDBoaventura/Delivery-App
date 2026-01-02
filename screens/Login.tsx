
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-y-auto no-scrollbar">
      {/* Botão de Voltar Flutuante */}
      <div className="absolute top-6 left-6 z-50">
        <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-white/80 backdrop-blur-md border border-white shadow-xl flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
      </div>

      {/* Top Decoration */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <div className="px-8 pt-20 pb-10 flex flex-col items-center text-center">
        {/* Logo Container mimicking the uploaded image style */}
        <div className="mb-8 relative animate-in zoom-in duration-500">
          <div className="size-28 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-primary/20 p-4 border border-gray-50">
             <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-1">moped</span>
                <div className="absolute -top-2 -right-2 size-10 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-lg rotate-12">
                   <span className="material-symbols-outlined text-xl">favorite</span>
                </div>
             </div>
          </div>
        </div>
        
        <div className="flex items-baseline gap-0.5 mb-2">
          <span className="text-4xl font-black text-primary tracking-tight">moz</span>
          <span className="text-4xl font-black text-secondary tracking-tight">delivery</span>
        </div>
        <p className="text-gray-500 font-medium text-center max-w-[240px] leading-relaxed">
          Entregas rápidas com o coração de Moçambique.
        </p>
      </div>

      <form onSubmit={handleLogin} className="px-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">E-mail ou Telemóvel</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">alternate_email</span>
            </div>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-16 bg-white border-2 border-transparent rounded-2xl pl-12 pr-5 text-sm font-bold shadow-sm focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
              placeholder="exemplo@moz.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Palavra-passe</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">lock_open</span>
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-16 bg-white border-2 border-transparent rounded-2xl pl-12 pr-14 text-sm font-bold shadow-sm focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all outline-none" 
              placeholder="••••••••"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-[11px] font-extrabold text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Esqueci a senha?</button>
        </div>

        <button 
          type="submit"
          className="w-full h-16 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-primary/30 active:scale-[0.97] hover:brightness-110 transition-all mt-4"
        >
          Entrar no MozDelivery
        </button>
      </form>

      <div className="px-8 mt-12 animate-in fade-in duration-1000 delay-300">
        <div className="relative flex items-center justify-center mb-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <span className="relative bg-background px-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Ou entrar com</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 active:scale-95 hover:bg-gray-50 transition-all shadow-sm">
            <img src="https://www.google.com/favicon.ico" className="size-5" alt="Google" />
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Google</span>
          </button>
          <button className="h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 active:scale-95 hover:bg-gray-50 transition-all shadow-sm">
            <svg className="size-5 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Facebook</span>
          </button>
        </div>
      </div>

      <div className="mt-auto py-12 text-center">
        <p className="text-sm text-gray-400 font-medium">
          Novo por aqui?
          <Link to="/signup" className="text-secondary font-black uppercase text-xs tracking-[0.15em] ml-2 border-b-2 border-secondary/20 pb-0.5">Criar Conta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
