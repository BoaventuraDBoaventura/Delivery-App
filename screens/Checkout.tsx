
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { subtotal, clearCart } = useCart();

  const handleFinish = () => {
    clearCart();
    navigate('/order-status');
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="text-lg font-bold text-gray-900 text-center flex-1 pr-10">Pagamento</h1>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">location_on</span>
            Ponto de Entrega
          </h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">home</span></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-900">Casa</h4>
                <span className="text-primary text-[10px] font-bold px-2 py-0.5 bg-primary/10 rounded tracking-widest">MAPUTO</span>
              </div>
              <p className="text-sm text-gray-500">Av. Julius Nyerere, Polana, Maputo</p>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">payments</span>
            Método de Pagamento
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
              <div className="w-12 h-12 bg-[#21b24b] rounded-xl flex items-center justify-center text-white text-[8px] font-black uppercase tracking-tighter">M-PESA</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">Vodacom M-Pesa</h4>
                <p className="text-xs text-gray-500">Confirmar no Telemóvel</p>
              </div>
              <div className="size-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="size-2.5 rounded-full bg-primary"></div>
              </div>
            </label>
            <label className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white cursor-pointer opacity-50">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-[8px] font-black uppercase tracking-tighter">MKESH</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">mKesh</h4>
                <p className="text-xs text-gray-500">Tmcel</p>
              </div>
              <div className="size-5 rounded-full border-2 border-gray-200"></div>
            </label>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Conta Final</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-500 font-bold">
              <span>Subtotal</span>
              <span className="text-gray-900">{subtotal.toFixed(2).replace('.', ',')} MT</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 font-bold">
              <span>Taxa de serviço</span>
              <span className="text-green-600">Grátis</span>
            </div>
            <div className="border-t border-gray-50 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-black text-lg text-gray-900 uppercase tracking-widest">Total</span>
              <span className="font-black text-xl text-primary">{subtotal.toFixed(2).replace('.', ',')} MT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-5 z-50 rounded-t-3xl shadow-2xl">
        <button 
          onClick={handleFinish}
          className="w-full bg-primary text-white h-16 rounded-2xl shadow-lg shadow-primary/20 flex justify-between items-center px-8 transition-all active:scale-[0.98]"
        >
          <span className="font-black text-xs uppercase tracking-widest">Pagar e Encomendar</span>
          <span className="font-black text-lg">{subtotal.toFixed(2).replace('.', ',')} MT</span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
