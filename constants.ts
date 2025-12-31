
import { Dish, Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Sabor da Vila',
    category: 'Italiana • Massas • Vinhos',
    rating: 4.8,
    reviewsCount: '1.2k',
    deliveryTime: '30-40 min',
    deliveryFee: 'Grátis',
    image: 'https://picsum.photos/seed/pasta/800/400',
    logo: 'https://picsum.photos/seed/logo1/200/200',
    isVerified: true,
    tags: ['Destaques', 'Entradas', 'Pratos Principais', 'Sobremesas'],
    ownerId: 'owner-1',
    location: { lat: -23.5617, lng: -46.6558, address: 'Av. Paulista, 1578' }
  },
  {
    id: '2',
    name: 'Burger King House',
    category: 'Americana • Lanches • $$',
    rating: 4.8,
    reviewsCount: '2k',
    deliveryTime: '20-30 min',
    deliveryFee: 'Grátis',
    image: 'https://picsum.photos/seed/burger/800/400',
    logo: 'https://picsum.photos/seed/logo2/200/200',
    isVerified: false,
    tags: ['Lanches', 'Combos', 'Bebidas'],
    ownerId: 'owner-2',
    location: { lat: -23.5667, lng: -46.6517, address: 'Av. Paulista, 2000' }
  }
];

export const DISHES: Dish[] = [
  {
    id: 'd1',
    name: 'Spaghetti Carbonara',
    description: 'Clássico italiano com ovos, queijo pecorino, guanciale e pimenta do reino.',
    price: 45.90,
    image: 'https://picsum.photos/seed/carbonara/400/300',
    images: [
      'https://picsum.photos/seed/carbonara/400/300',
      'https://picsum.photos/seed/pasta1/400/300',
      'https://picsum.photos/seed/pasta2/400/300'
    ],
    category: 'Pratos Principais',
    isPopular: true,
    calories: 620
  },
  {
    id: 'd2',
    name: 'Dadinhos de Tapioca',
    description: 'Cubos crocantes de tapioca com queijo coalho, acompanha geleia de pimenta.',
    price: 24.90,
    image: 'https://picsum.photos/seed/tapioca/400/300',
    images: [
      'https://picsum.photos/seed/tapioca/400/300',
      'https://picsum.photos/seed/tapioca2/400/300'
    ],
    category: 'Entradas',
    isPopular: true
  }
];
