
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { subtotal, clearCart } = useCart();

  const handleFinish = () => {
    // Simulating order placement
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
            Endereço de Entrega
          </h3>
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-primary shrink-0"><span className="material-symbols-outlined">home</span></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-900">Casa</h4>
                <span className="text-primary text-[10px] font-bold px-2 py-0.5 bg-primary/10 rounded">PRINCIPAL</span>
              </div>
              <p className="text-sm text-gray-500">Av. Paulista, 1578 - Bela Vista, SP</p>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">payments</span>
            Forma de Pagamento
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
              <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">Visa **** 4829</h4>
                <p className="text-xs text-gray-500">Crédito</p>
              </div>
              <div className="size-5 rounded-full border-2 border-primary flex items-center justify-center">
                <div className="size-2.5 rounded-full bg-primary"></div>
              </div>
            </label>
            <button className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-gray-300 text-gray-400">
              <span className="material-symbols-outlined">add_card</span>
              <span className="font-bold text-sm">Adicionar novo cartão</span>
            </button>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Resumo do Pedido</h3>
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Taxa de entrega</span>
              <span className="font-medium text-green-600">Grátis</span>
            </div>
            <div className="border-t border-gray-50 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-900">Total</span>
              <span className="font-bold text-xl text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-5 z-50 rounded-t-3xl shadow-2xl">
        <button 
          onClick={handleFinish}
          className="w-full bg-primary text-white h-14 rounded-2xl shadow-lg shadow-primary/30 flex justify-between items-center px-6"
        >
          <span className="font-bold">Finalizar Pedido</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            <span className="material-symbols-outlined">check_circle</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
