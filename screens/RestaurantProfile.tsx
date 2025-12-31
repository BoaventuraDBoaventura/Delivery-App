
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS, DISHES } from '../constants';
import { useCart } from '../CartContext';

type ActiveTab = 'menu' | 'reviews' | 'info';

interface UserReview {
  id: string;
  user: string;
  comment: string;
  date: string;
  rating: number;
  photos?: string[];
  isNew?: boolean;
  canEdit?: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(restaurant.tags));

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const navItems = [...restaurant.tags, 'Reviews', 'Info'];

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  
  const [localReviews, setLocalReviews] = useState<UserReview[]>([
    { id: 'rev-1', user: 'Ricardo M.', comment: 'Melhor carbonara da região! Chegou quentinho e no ponto certo.', date: 'Há 2 dias', rating: 5, canEdit: false },
    { id: 'rev-2', user: 'Ana Paula', comment: 'O atendimento é sensacional. Recomendo muito as entradas.', date: 'Há 1 semana', rating: 4, canEdit: false }
  ]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('sabor-da-vila-favorites') || '[]');
    setIsFavorite(favorites.includes(restaurant.id));
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [restaurant.id]);

  useEffect(() => {
    if (isLoading) return;
    const options = { root: null, rootMargin: '-160px 0px -70% 0px', threshold: 0 };
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cat = entry.target.getAttribute('data-category');
          if (cat) {
            setActiveTag(cat);
            if (cat === 'Reviews') setActiveTab('reviews');
            else if (cat === 'Info') setActiveTab('info');
            else setActiveTab('menu');
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, options);
    Object.values(sectionRefs.current).forEach(section => { if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [isLoading, expandedCategories]);

  const toggleCategory = (tag: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const scrollToCategory = (tag: string) => {
    if (restaurant.tags.includes(tag) && !expandedCategories.has(tag)) {
      setExpandedCategories(prev => new Set(prev).add(tag));
    }
    setTimeout(() => {
      const section = sectionRefs.current[tag];
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTag(tag);
      }
    }, 50);
  };

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

  const submitReview = () => {
    if (userRating === 0) return alert('Selecione uma nota.');
    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: UserReview = {
        id: `rev-${Date.now()}`,
        user: 'Você',
        comment: userComment || 'Sem comentários.',
        date: 'Agora mesmo',
        rating: userRating,
        canEdit: true
      };
      setLocalReviews([newReview, ...localReviews]);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowReviewForm(false);
        setUserRating(0);
        setUserComment('');
      }, 2000);
    }, 1000);
  };

  if (isLoading) {
    return <div className="flex-1 bg-background animate-pulse"></div>;
  }

  return (
    <div ref={scrollContainerRef} className="flex-1 overflow-y-auto relative bg-background h-full no-scrollbar scroll-smooth">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-gray-100 h-16 shadow-sm">
        <button onClick={() => navigate('/')} className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 active:bg-gray-200"><span className="material-symbols-outlined font-bold">arrow_back</span></button>
        <div className="flex-1 px-4 text-center overflow-hidden">
          <h1 className="font-extrabold text-gray-900 truncate text-[10px] uppercase tracking-[0.15em]">Restaurante</h1>
          <h2 className="text-sm font-bold text-gray-500 truncate">{restaurant.name}</h2>
        </div>
        <div className="flex gap-0.5">
          <button onClick={toggleFavorite} className={`size-9 flex items-center justify-center rounded-full transition-all ${animateFavorite ? 'scale-125' : 'scale-100'} ${isFavorite ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`material-symbols-outlined text-xl ${isFavorite ? 'fill-current' : ''}`}>favorite</span>
          </button>
        </div>
      </header>

      <div className="relative">
        <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="px-5 -mt-10 pb-2">
          <div className="bg-white rounded-3xl shadow-xl p-5 flex flex-col items-center text-center border border-gray-100 relative">
            <div className="absolute -top-10 bg-white p-1 rounded-full shadow-md"><img src={restaurant.logo} className="h-20 w-20 rounded-full border border-gray-100" alt="logo" /></div>
            <div className="mt-10 w-full">
              <h1 className="text-2xl font-black text-gray-900 mb-1">{restaurant.name}</h1>
              <p className="text-sm text-primary font-bold mb-4">{restaurant.category}</p>
              <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100">
                <button onClick={() => scrollToCategory('Destaques')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'menu' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}><span className="material-symbols-outlined text-[18px]">restaurant_menu</span> Menu</button>
                <button onClick={() => scrollToCategory('Reviews')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'reviews' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}><span className="material-symbols-outlined text-[18px]">grade</span> Reviews</button>
                <button onClick={() => scrollToCategory('Info')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs transition-all ${activeTab === 'info' ? 'bg-primary text-white shadow-md' : 'text-gray-400'}`}><span className="material-symbols-outlined text-[18px]">info</span> Info</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md py-3 pl-5 border-b border-gray-100 flex overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pr-5">
          {navItems.map(item => (
            <button key={item} onClick={() => scrollToCategory(item)} className={`shrink-0 px-6 py-2 rounded-full text-xs font-bold transition-all border ${activeTag === item ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border-gray-100'}`}>
              {item === 'Reviews' ? 'Avaliações' : item === 'Info' ? 'Informações' : item}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-32">
        {restaurant.tags.map((tag) => {
          const sectionItems = tag === 'Destaques' ? DISHES.filter(d => d.isPopular) : DISHES.filter(d => d.category === tag);
          if (sectionItems.length === 0) return null;
          const isExpanded = expandedCategories.has(tag);
          return (
            <div key={tag} data-category={tag} ref={el => { sectionRefs.current[tag] = el; }} className="scroll-mt-[124px] border-b border-gray-50">
              <button onClick={() => toggleCategory(tag)} className="w-full flex items-center justify-between py-5 px-5 bg-white"><h2 className="text-lg font-black text-gray-900">{tag}</h2><span className={`material-symbols-outlined text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>expand_more</span></button>
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}>
                <div className="px-5 pb-8 pt-2 grid grid-cols-1 gap-4">
                  {sectionItems.map(dish => (
                    <div key={dish.id} onClick={() => navigate(`/dish/${dish.id}`)} className="flex bg-white p-4 rounded-3xl border border-gray-100 shadow-sm"><div className="flex-1 pr-4"><h3 className="font-bold text-gray-900 mb-1">{dish.name}</h3><p className="text-xs text-gray-400 line-clamp-2 mb-3">{dish.description}</p><span className="font-black text-gray-900">R$ {dish.price.toFixed(2).replace('.', ',')}</span></div><div className="size-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0"><img src={dish.image} className="w-full h-full object-cover" /></div></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={el => { sectionRefs.current['Reviews'] = el; }} data-category="Reviews" className="px-5 py-12 scroll-mt-[124px] bg-white mt-4 border-t border-gray-50">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Avaliações</h2>
          <div className="space-y-4">
            {localReviews.map((rev) => (
              <div key={rev.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm"><div className="flex justify-between items-start mb-3"><div className="flex items-center gap-3"><div className="size-10 rounded-full bg-gray-100 flex items-center justify-center"><span className="material-symbols-outlined text-gray-400">person</span></div><div><h4 className="font-bold text-gray-900 text-sm">{rev.user}</h4><div className="flex gap-0.5 mt-0.5">{[1,2,3,4,5].map(s => <span key={s} className={`material-symbols-outlined text-[14px] ${s <= rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`}>star</span>)}</div></div></div><span className="text-[10px] text-gray-300 font-bold">{rev.date}</span></div><p className="text-xs text-gray-600 leading-relaxed italic">"{rev.comment}"</p></div>
            ))}
          </div>
        </div>

        <div ref={el => { sectionRefs.current['Info'] = el; }} data-category="Info" className="px-5 py-12 scroll-mt-[124px] bg-background">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Informações</h2>
          <div className="space-y-6">
            <section className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0"><span className="material-symbols-outlined">location_on</span></div>
                <div>
                  <h4 className="text-sm font-black text-gray-900">Onde estamos</h4>
                  <p className="text-xs text-gray-500 mt-1">Av. Paulista, 1578 - Bela Vista, São Paulo - SP</p>
                  <a href="https://www.openstreetmap.org/search?query=Av+Paulista+1578+Sao+Paulo" target="_blank" className="text-[10px] font-black text-primary uppercase mt-2 block border-b border-primary/20 w-max">Abrir no OpenStreetMap</a>
                </div>
              </div>
            </section>
            
            {/* OpenStreetMap Iframe */}
            <div className="bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="h-64 rounded-[2rem] overflow-hidden relative border border-gray-50 shadow-inner">
                 <iframe 
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   scrolling="no" 
                   marginHeight={0} 
                   marginWidth={0} 
                   src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6575%2C-23.5630%2C-46.6540%2C-23.5605&amp;layer=mapnik&amp;marker=-23.5617%2C-46.6558"
                   style={{ border: 'none' }}
                 ></iframe>
                 <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-[8px] font-bold text-gray-400">© OpenStreetMap contributors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 w-full max-w-md px-5 z-50">
          <button onClick={() => navigate('/cart')} className="w-full bg-primary text-white h-16 rounded-3xl shadow-2xl flex justify-between items-center px-6 transition-all active:scale-95"><div className="flex items-center gap-3"><div className="bg-white/20 size-8 rounded-xl flex items-center justify-center font-black text-sm">{cart.length}</div><span className="font-black text-sm uppercase tracking-widest">Ver Cesta</span></div><span className="font-black text-lg">R$ {subtotal.toFixed(2).replace('.', ',')}</span></button>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
