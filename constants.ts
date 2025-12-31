
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
    tags: ['Destaques', 'Entradas', 'Pratos Principais', 'Sobremesas']
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
    tags: ['Lanches', 'Combos', 'Bebidas']
  }
];

export const DISHES: Dish[] = [
  {
    id: 'd1',
    name: 'Spaghetti Carbonara',
    description: 'Clássico italiano com ovos, queijo pecorino, guanciale e pimenta do reino.',
    price: 45.90,
    image: 'https://picsum.photos/seed/carbonara/400/300',
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
    category: 'Entradas',
    isPopular: true
  },
  {
    id: 'd3',
    name: 'Bruschetta Clássica',
    description: 'Pão italiano tostado, tomates frescos, manjericão, alho e azeite.',
    price: 28.00,
    image: 'https://picsum.photos/seed/bruschetta/400/300',
    category: 'Entradas'
  },
  {
    id: 'd4',
    name: 'Burrata Caprese',
    description: 'Burrata cremosa servida com tomates cereja confitados e pesto.',
    price: 52.00,
    image: 'https://picsum.photos/seed/burrata/400/300',
    category: 'Entradas'
  },
  {
    id: 'd5',
    name: 'Parmegiana de Mignon',
    description: 'Filé mignon empanado, molho de tomate caseiro e queijo gratinado.',
    price: 58.00,
    image: 'https://picsum.photos/seed/parmegiana/400/300',
    category: 'Pratos Principais'
  },
  {
    id: 'd6',
    name: 'Risoto de Funghi',
    description: 'Arroz arbóreo cozido lentamente com mix de cogumelos selvagens.',
    price: 64.00,
    image: 'https://picsum.photos/seed/risoto/400/300',
    category: 'Pratos Principais'
  }
];
