
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DISHES, RESTAURANTS } from '../constants';
import { Dish } from '../types';

type Tab = 'orders' | 'menu' | 'settings';

const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [isOpen, setIsOpen] = useState(true);
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dishImageRef = useRef<HTMLInputElement>(null);
  
  const [logoUrl, setLogoUrl] = useState<string>(RESTAURANTS[0].logo);
  const [categories, setCategories] = useState(['Pratos Típicos', 'Mariscos', 'Entradas', 'Sobremesas', 'Bebidas']);
  
  // New Dish State
  const [newDish, setNewDish] = useState<Partial<Dish>>({
    name: '',
    description: '',
    price: 0,
    category: 'Pratos Típicos',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  });

  const [customCategory, setCustomCategory] = useState('');

  // Mock Active Orders
  const [orders, setOrders] = useState([
    { id: '#4821', customer: 'Carlos Macuacua', items: '2x Caril de Caranguejo', total: '1.700,00 MT', status: 'preparing' },
    { id: '#4822', customer: 'Sara Jane', items: '1x Frango à Zambeziana', total: '650,00 MT', status: 'confirmed' }
  ]);

  const updateOrderStatus = (id: string, nextStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDishImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewDish(prev => ({ ...prev, image: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDish = () => {
    if (!newDish.name || !newDish.price) {
      alert('Por favor, preencha o nome e o preço do prato.');
      return;
    }

    const finalCategory = isAddingNewCategory ? customCategory : newDish.category;
    
    if (isAddingNewCategory && customCategory.trim()) {
      if (!categories.includes(customCategory.trim())) {
        setCategories(prev => [...prev, customCategory.trim()]);
      }
    }

    alert(`Prato "${newDish.name}" adicionado com sucesso na categoria "${finalCategory}"!`);
    setIsAddingDish(false);
    setIsAddingNewCategory(false);
    setCustomCategory('');
    setNewDish({ 
      name: '', 
      description: '', 
      price: 0, 
      category: 'Pratos Típicos', 
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80' 
    });
  };

  if (isAddingDish) {
    return (
      <div className="flex-1 flex flex-col bg-background h-full overflow-hidden animate-in slide-in-from-bottom duration-300">
        <header className="p-4 bg-white border-b border-gray-100 flex items-center gap-4 sticky top-0 z-50">
          <button onClick={() => setIsAddingDish(false)} className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900">Novo Prato</h1>
        </header>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar pb-10">
          <section className="space-y-4">
            <div className="relative h-56 w-full rounded-[2.5rem] overflow-hidden bg-gray-100 group cursor-pointer" onClick={() => dishImageRef.current?.click()}>
              <img src={newDish.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-4xl mb-2">add_a_photo</span>
                <span className="text-xs font-black uppercase tracking-widest">Alterar Foto</span>
              </div>
              <input type="file" ref={dishImageRef} onChange={handleDishImageChange} className="hidden" accept="image/*" />
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nome do Prato</label>
                <input 
                  type="text" 
                  value={newDish.name} 
                  onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                  placeholder="Ex: Matapa com Arroz" 
                  className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Preço (MT)</label>
                  <input 
                    type="number" 
                    value={newDish.price || ''} 
                    onChange={(e) => setNewDish({...newDish, price: parseFloat(e.target.value)})}
                    placeholder="0,00" 
                    className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Calorias (opcional)</label>
                  <input 
                    type="number" 
                    placeholder="kcal" 
                    className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between ml-2 mb-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoria</label>
                  <button 
                    onClick={() => setIsAddingNewCategory(!isAddingNewCategory)}
                    className="text-[9px] font-black text-primary uppercase flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isAddingNewCategory ? 'list' : 'add_circle'}
                    </span>
                    {isAddingNewCategory ? 'Selecionar da Lista' : 'Nova Categoria'}
                  </button>
                </div>

                <div className="relative">
                  {isAddingNewCategory ? (
                    <input 
                      type="text"
                      autoFocus
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Nome da nova categoria..."
                      className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 border-2 border-primary/20"
                    />
                  ) : (
                    <>
                      <select 
                        value={newDish.category}
                        onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                        className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm appearance-none focus:ring-2 focus:ring-primary/20"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <span className="material-symbols-outlined text-sm">expand_more</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Descrição</label>
                <textarea 
                  value={newDish.description}
                  onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                  className="w-full h-32 bg-white border-none rounded-2xl p-5 text-sm font-bold shadow-sm focus:ring-2 focus:ring-primary/20 resize-none" 
                  placeholder="Descreva os ingredientes e o sabor..."
                />
              </div>
            </div>
          </section>

          <button onClick={handleSaveDish} className="w-full h-16 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4">
            Adicionar à Ementa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      <header className="p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors active:scale-90">
            <span className="material-symbols-outlined font-bold text-gray-900">arrow_back</span>
          </button>
          <div className="flex-1 px-4">
             <h1 className="text-lg font-black text-gray-900 truncate">{RESTAURANTS[0].name}</h1>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Painel do Proprietário</p>
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`px-4 h-9 rounded-full font-black text-[9px] uppercase tracking-widest transition-all ${isOpen ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}
          >
            {isOpen ? 'Aberto' : 'Fechado'}
          </button>
        </div>

        <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
           {(['orders', 'menu', 'settings'] as Tab[]).map((tab) => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
             >
               {tab === 'orders' ? 'Pedidos' : tab === 'menu' ? 'Ementa' : 'Definições'}
             </button>
           ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar pb-24">
        
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Vendas Hoje</p>
                <p className="text-lg font-black text-gray-900">2.350 MT</p>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Pedidos Ativos</p>
                <p className="text-lg font-black text-gray-900">{orders.length}</p>
              </div>
            </div>

            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pedidos em Curso</h3>
            {orders.map(order => (
              <div key={order.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{order.id} • {order.customer}</h4>
                    <p className="text-xs text-gray-500 mt-1">{order.items}</p>
                  </div>
                  <span className="font-black text-primary text-sm">{order.total}</span>
                </div>
                
                <div className="flex gap-2">
                  {order.status === 'confirmed' && (
                    <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="flex-1 h-10 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Preparar</button>
                  )}
                  {order.status === 'preparing' && (
                    <button onClick={() => updateOrderStatus(order.id, 'on_the_way')} className="flex-1 h-10 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Sair para Entrega</button>
                  )}
                  {order.status === 'on_the_way' && (
                    <button className="flex-1 h-10 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Concluir</button>
                  )}
                  <button className="size-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><span className="material-symbols-outlined text-[20px]">more_horiz</span></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-4">
            <button 
              onClick={() => setIsAddingDish(true)}
              className="w-full h-14 border-2 border-dashed border-primary/30 rounded-3xl text-primary font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mb-6 hover:bg-primary/5 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Adicionar Novo Prato
            </button>

            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pratos Disponíveis</h3>
            <div className="space-y-3">
              {DISHES.map(dish => (
                <div key={dish.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex gap-4 items-center">
                  <img src={dish.image} className="size-16 rounded-2xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{dish.name}</h4>
                    <p className="font-black text-primary text-xs">{dish.price.toFixed(2).replace('.', ',')} MT</p>
                  </div>
                  <div className="flex gap-1">
                     <button className="size-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                     <button className="size-8 rounded-lg bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <section className="flex flex-col items-center gap-4">
              <div onClick={() => fileInputRef.current?.click()} className="relative size-28 cursor-pointer group">
                <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                  <img src={logoUrl} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white">
                  <span className="material-symbols-outlined">photo_camera</span>
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleLogoChange} className="hidden" accept="image/*" />
            </section>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Nome do Restaurante</label>
                <input type="text" defaultValue={RESTAURANTS[0].name} className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Categoria</label>
                  <select className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm appearance-none">
                    <option>Moçambicana</option>
                    <option>Mariscos</option>
                    <option>Grelhados</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Taxa de Entrega (MT)</label>
                  <input type="number" defaultValue="50" className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Tempo Médio (min)</label>
                <input type="text" defaultValue="30-45" className="w-full h-14 bg-white border-none rounded-2xl px-5 text-sm font-bold shadow-sm" />
              </div>

              <button className="w-full h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 mt-4 active:scale-95 transition-all">
                Guardar Alterações
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RestaurantDashboard;
