
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS, DISHES } from '../constants';
import { useCart } from '../CartContext';

type ActiveTab = 'menu' | 'reviews' | 'info';

interface UserReview {
  user: string;
  comment: string;
  date: string;
  rating: number;
  photos?: string[];
}

const RestaurantProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subtotal, cart } = useCart();
  const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];
  const [activeTag, setActiveTag] = useState('Destaques');
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [animateFavorite, setAnimateFavorite] = useState(false);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [localReviews, setLocalReviews] = useState<UserReview[]>([
    { user: 'Ricardo M.', comment: 'Melhor carbonara da região! Chegou quentinho e no ponto certo.', date: 'Há 2 dias', rating: 5 },
    { user: 'Ana Paula', comment: 'O atendimento é sensacional. Recomendo muito as entradas.', date: 'Há 1 semana', rating: 4 }
  ]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('sabor-da-vila-favorites') || '[]');
    setIsFavorite(favorites.includes(restaurant.id));
  }, [restaurant.id]);

  const toggleFavorite = () => {
    setAnimateFavorite(true);
    setTimeout(() => setAnimateFavorite(false), 200);

    const favorites = JSON.parse(localStorage.getItem('sabor-da-vila-favorites') || '[]');
    let newFavorites;
    if (favorites.includes(restaurant.id)) {
      newFavorites = favorites.filter((favId: string) => favId !== restaurant.id);
      setIsFavorite(false);
    } else {
      newFavorites = [...favorites, restaurant.id];
      setIsFavorite(true);
    }
    localStorage.setItem('sabor-da-vila-favorites', JSON.stringify(newFavorites));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Confira o ${restaurant.name} no Sabor da Vila!`,
          text: `Dê uma olhada no cardápio de ${restaurant.category} do ${restaurant.name}. É incrível!`,
          url: window.location.href,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
  };

  const submitReview = () => {
    if (userRating === 0) return alert('Por favor, selecione uma nota.');
    
    const newReview: UserReview = {
      user: 'Você',
      comment: userComment || 'Sem comentários.',
      date: 'Agora mesmo',
      rating: userRating
    };

    setLocalReviews([newReview, ...localReviews]);
    setUserRating(0);
    setUserComment('');
    setShowReviewForm(false);
  };

  const getRatingLabel = (r: number) => {
    if (r === 5) return 'Incrível!';
    if (r === 4) return 'Muito bom';
    if (r === 3) return 'Ok';
    if (r === 2) return 'Pode melhorar';
    if (r === 1) return 'Péssimo';
    return 'Selecione uma nota';
  };

  return (
    <div className="flex-1 overflow-y-auto relative bg-background h-full no-scrollbar">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16 shadow-sm">
        <button 
          onClick={() => navigate('/')} 
          className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 transition-colors active:bg-gray-200"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        
        <div className="flex-1 px-4 text-center overflow-hidden">
          <h1 className="font-extrabold text-gray-900 truncate text-[10px] uppercase tracking-[0.15em]">Restaurante</h1>
          <h2 className="text-sm font-bold text-gray-500 truncate">{restaurant.name}</h2>
        </div>

        <div className="flex gap-0.5">
          <button className="size-9 flex items-center justify-center rounded-full text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button onClick={handleShare} className="size-9 flex items-center justify-center rounded-full text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
          <button 
            onClick={toggleFavorite} 
            className={`size-9 flex items-center justify-center rounded-full transition-all duration-200 transform ${animateFavorite ? 'scale-125' : 'scale-100'} ${isFavorite ? 'text-primary' : 'text-gray-400'}`}
          >
            <span className={`material-symbols-outlined text-xl ${isFavorite ? 'fill-current' : ''}`}>favorite</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="px-5 -mt-10 pb-2">
          <div className="bg-white rounded-3xl shadow-xl p-5 flex flex-col items-center text-center border border-gray-100 relative overflow-hidden">
            <div className="absolute -top-10 bg-white p-1 rounded-full shadow-md">
              <img src={restaurant.logo} className="h-20 w-20 rounded-full border border-gray-100" alt="logo" />
            </div>
            <div className="mt-10 w-full">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h1 className="text-2xl font-black text-gray-900">{restaurant.name}</h1>
                {restaurant.isVerified && <span className="material-symbols-outlined text-blue-500 text-[20px] fill-current">verified</span>}
              </div>
              <p className="text-sm text-primary font-bold mb-4">{restaurant.category}</p>
              
              <div className="flex items-center justify-center gap-6 divide-x divide-gray-100 mb-6">
                <div className="flex flex-col items-center px-2">
                  <div className="flex items-center gap-1 text-gray-900 font-bold text-sm">
                    <span>{restaurant.rating}</span>
                    <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{restaurant.reviewsCount} Avaliações</span>
                </div>
                <div className="flex flex-col items-center px-2 pl-6">
                  <span className="text-gray-900 font-bold text-sm">{restaurant.deliveryTime}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Entrega</span>
                </div>
                <div className="flex flex-col items-center px-2 pl-6">
                  <span className="text-green-600 font-bold text-sm">{restaurant.deliveryFee}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Taxa</span>
                </div>
              </div>

              {/* Action Tabs */}
              <div className="flex bg-gray-50 p-1 rounded-2xl mb-2 border border-gray-100">
                <button 
                  onClick={() => setActiveTab('menu')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">restaurant_menu</span> Menu
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">grade</span> Reviews
                </button>
                <button 
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'info' ? 'bg-primary text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">info</span> Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-32">
        {activeTab === 'menu' && (
          <>
            {/* Category Slider */}
            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-3 pl-5 border-b border-gray-100 flex overflow-x-auto no-scrollbar">
              <div className="flex gap-3 pr-5">
                {restaurant.tags.map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`shrink-0 px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeTag === tag ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100 hover:border-primary/30'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-6 space-y-8">
              {/* Popular Section */}
              <section>
                <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary fill-current">local_fire_department</span>
                  Populares da Casa
                </h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-5 px-5">
                  {DISHES.filter(d => d.isPopular).map(dish => (
                    <div 
                      key={dish.id} 
                      className="shrink-0 w-60 bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col gap-3 cursor-pointer transition-all hover:shadow-xl active:scale-95"
                      onClick={() => navigate(`/dish/${dish.id}`)}
                    >
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-lg text-[9px] font-black text-primary uppercase tracking-wider">🔥 Destaque</div>
                      </div>
                      <div className="px-1 pb-1">
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{dish.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-black text-primary text-sm">R$ {dish.price.toFixed(2).replace('.', ',')}</span>
                          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined text-lg">add</span></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Menu List */}
              <section>
                <h2 className="text-lg font-black text-gray-900 mb-4">{activeTag}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {DISHES.filter(d => d.category === activeTag || activeTag === 'Destaques').map(dish => (
                    <div 
                      key={dish.id} 
                      className="flex bg-white p-4 rounded-3xl shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md active:scale-[0.98] group"
                      onClick={() => navigate(`/dish/${dish.id}`)}
                    >
                      <div className="flex-1 pr-4 py-1">
                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{dish.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-3 font-medium">{dish.description}</p>
                        <span className="font-black text-gray-900">R$ {dish.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="relative size-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50">
                        <img src={dish.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={dish.name} />
                        <div className="absolute bottom-1 right-1 size-7 rounded-full bg-white text-primary shadow-lg flex items-center justify-center"><span className="material-symbols-outlined text-sm">add</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {activeTab === 'reviews' && (
          <div className="px-5 py-8 animate-in fade-in slide-in-from-bottom-4 space-y-8">
            {/* Review Summary */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <div className="text-4xl font-black text-gray-900 mb-1">{restaurant.rating}</div>
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`material-symbols-outlined text-xl ${i <= Math.floor(restaurant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}>star</span>
                ))}
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Média de {restaurant.reviewsCount} avaliações</p>
              
              <div className="w-full space-y-3 px-4 mb-6">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-400 w-4">{stars}</span>
                    <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {!showReviewForm && (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="w-full py-4 bg-primary/5 text-primary rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/10 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_square</span>
                  Avaliar Agora
                </button>
              )}
            </div>

            {/* Submit Review Form */}
            {showReviewForm && (
              <div className="bg-white rounded-3xl p-6 border-2 border-primary/20 shadow-xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-gray-900">Sua Avaliação</h3>
                  <button onClick={() => setShowReviewForm(false)} className="text-gray-400 hover:text-red-500"><span className="material-symbols-outlined">close</span></button>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <div className="flex gap-2 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <button 
                        key={i} 
                        onClick={() => setUserRating(i)}
                        className={`size-10 flex items-center justify-center transition-all ${i <= userRating ? 'text-yellow-400 scale-110' : 'text-gray-200 hover:text-yellow-200'}`}
                      >
                        <span className={`material-symbols-outlined text-3xl ${i <= userRating ? 'fill-current' : ''}`}>star</span>
                      </button>
                    ))}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${userRating > 0 ? 'text-primary' : 'text-gray-300'}`}>
                    {getRatingLabel(userRating)}
                  </span>
                </div>

                <textarea 
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Conte-nos sua experiência..."
                  className="w-full h-32 p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm text-gray-900 placeholder:text-gray-300 resize-none mb-4 font-medium"
                />

                <div className="flex items-center gap-3 mb-6">
                  <button className="size-16 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-primary/30 hover:text-primary transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl">add_a_photo</span>
                    <span className="text-[8px] font-bold uppercase mt-1">Fotos</span>
                  </button>
                  <div className="text-[10px] text-gray-400 font-medium">Opcional: Adicione até 3 fotos do prato.</div>
                </div>

                <button 
                  onClick={submitReview}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  Publicar Avaliação
                </button>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Destaques dos Clientes</h3>
              {localReviews.map((rev, i) => (
                <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-lg">person</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{rev.user}</h4>
                    </div>
                    <span className="text-[10px] text-gray-300 font-bold">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(s => <span key={s} className={`material-symbols-outlined text-[14px] ${s <= rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}>star</span>)}
                  </div>
                  <p className="text-xs text-gray-500 italic">"{rev.comment}"</p>
                </div>
              ))}
              <button className="w-full py-4 text-primary font-black text-xs uppercase tracking-widest">Ler todos os comentários</button>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="px-5 py-8 animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Endereço</h4>
                  <p className="text-xs text-gray-500 mt-1">Rua das Palmeiras, 452 - Vila Gourmet, São Paulo - SP</p>
                  <button className="text-[10px] font-bold text-primary uppercase mt-2">Ver no mapa</button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Horário de Funcionamento</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500">
                      <span>SEG - SEX</span>
                      <span>11:30 - 23:00</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-primary">
                      <span>SÁB - DOM</span>
                      <span>12:00 - 00:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2">
                <div className="size-10 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Formas de Pagamento</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Crédito, Débito, VR, PIX</p>
                </div>
              </div>
            </section>

            <div className="bg-gray-200 h-40 rounded-3xl overflow-hidden relative border border-gray-100 shadow-inner">
               <img src="https://picsum.photos/seed/restaurantmap/600/400" className="w-full h-full object-cover opacity-60" alt="map" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="size-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
                   <span className="material-symbols-outlined">location_on</span>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Summary FAB */}
      {cart.length > 0 && activeTab === 'menu' && (
        <div className="fixed bottom-6 w-full max-w-md px-5 z-50">
          <button 
            onClick={() => navigate('/cart')}
            className="w-full bg-primary text-white h-16 rounded-3xl shadow-2xl shadow-primary/40 flex justify-between items-center px-6 transform transition-all active:scale-95 hover:brightness-105"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 size-8 rounded-xl flex items-center justify-center font-black text-sm">{cart.length}</div>
              <span className="font-black text-sm uppercase tracking-widest">Ver Cesta</span>
            </div>
            <span className="font-black text-lg">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
