
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, subtotal, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-background">
        <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-primary text-6xl">shopping_basket</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sua cesta está vazia</h2>
        <p className="text-gray-500 mb-8">Navegue pelos restaurantes e adicione seus pratos favoritos aqui!</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full"
        >
          Ver Restaurantes
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full text-gray-900"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="text-lg font-bold text-gray-900">Carrinho</h1>
        <button className="size-10 flex items-center justify-center rounded-full text-red-500"><span className="material-symbols-outlined">delete</span></button>
      </header>

      <div className="flex-1 overflow-y-auto pb-40">
        <div className="px-5 py-6 border-b border-gray-100 flex items-center gap-4 bg-white">
          <div className="h-12 w-12 rounded-full bg-gray-100 border border-gray-200"></div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Seu pedido em</p>
            <h2 className="text-lg font-bold text-gray-900 leading-none">Sabor da Vila</h2>
            <button onClick={() => navigate(-1)} className="text-xs font-bold text-primary mt-1">Adicionar mais itens</button>
          </div>
        </div>

        <div className="px-5 py-6 flex flex-col gap-6">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            Itens do Pedido
          </h3>
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 group animate-in fade-in duration-300">
              <img src={item.image} className="w-24 h-24 rounded-xl object-cover shrink-0 border border-gray-100" alt={item.name} />
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 truncate pr-2">{item.name}</h4>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500"><span className="material-symbols-outlined text-xl">close</span></button>
                  </div>
                  {item.notes && <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">"{item.notes}"</p>}
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900">R$ {item.price.toFixed(2).replace('.', ',')}</span>
                  <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-2 py-1 shadow-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400"><span className="material-symbols-outlined text-lg">remove</span></button>
                    <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-primary"><span className="material-symbols-outlined text-lg">add</span></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-6">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Resumo de Valores</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Taxa de entrega</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>
              <div className="border-t border-dashed border-gray-100 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-5 z-50 rounded-t-3xl shadow-lg">
        <div className="flex justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">credit_card</span>
            <span className="text-sm font-bold text-gray-900">Pagamento no App</span>
          </div>
          <button className="text-sm font-bold text-primary">Alterar</button>
        </div>
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-primary text-white h-14 rounded-2xl shadow-lg shadow-primary/30 flex justify-between items-center px-6"
        >
          <span className="font-bold">Ir para o Pagamento</span>
          <div className="flex items-center gap-2">
            <span className="font-bold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cart;
