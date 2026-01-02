
import { Dish, Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Sabor da Vila',
    category: 'Tradicional • Maputo • $$',
    rating: 4.8,
    reviewsCount: '1.2k',
    deliveryTime: '30-40 min',
    deliveryFee: 'Grátis',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    logo: 'https://picsum.photos/seed/maputo1/200/200',
    isVerified: true,
    tags: ['Destaques', 'Pratos Típicos', 'Sobremesas'],
    ownerId: 'owner-1',
    location: { lat: -25.9692, lng: 32.5732, address: 'Av. Julius Nyerere, Maputo' }
  },
  {
    id: '2',
    name: 'Piri-Piri Grill',
    category: 'Grelhados • Frango • $',
    rating: 4.7,
    reviewsCount: '2k',
    deliveryTime: '20-30 min',
    deliveryFee: 'Grátis',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    logo: 'https://picsum.photos/seed/maputo2/200/200',
    isVerified: true,
    tags: ['Frango', 'Lanches', 'Bebidas'],
    ownerId: 'owner-2',
    location: { lat: -25.9650, lng: 32.5850, address: 'Av. 24 de Julho, Maputo' }
  },
  {
    id: '4',
    name: 'Sagres Seafood',
    category: 'Peixe • Tradicional • $$',
    rating: 4.6,
    reviewsCount: '800',
    deliveryTime: '25-35 min',
    deliveryFee: '50 MT',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    logo: 'https://picsum.photos/seed/maputo4/200/200',
    isVerified: false,
    tags: ['Destaques', 'Peixes', 'Entradas'],
    ownerId: 'owner-4',
    location: { lat: -25.9750, lng: 32.5920, address: 'Rua da Bagamoyo, Maputo' }
  },
  {
    id: '5',
    name: 'Restaurante Zambi',
    category: 'Internacional • Fusão • $$$',
    rating: 4.8,
    reviewsCount: '1.5k',
    deliveryTime: '35-50 min',
    deliveryFee: 'Grátis',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    logo: 'https://picsum.photos/seed/maputo5/200/200',
    isVerified: true,
    tags: ['Gourmet', 'Pratos Típicos', 'Drinks'],
    ownerId: 'owner-5',
    location: { lat: -25.9810, lng: 32.5680, address: 'Av. 10 de Novembro, Maputo' }
  }
];

export const DISHES: Dish[] = [
  // Sabor da Vila (ID: 1)
  {
    id: 'sv1', restaurantId: '1', name: 'Caril de Caranguejo',
    description: 'Tradicional caril com leite de coco e especiarias de Inhambane.',
    price: 850.00, category: 'Pratos Típicos', isPopular: true,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sv2', restaurantId: '1', name: 'Matapa com Arroz',
    description: 'Folhas de mandioquinha piladas com amendoim e camarão seco.',
    price: 450.00, category: 'Pratos Típicos', isPopular: true,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sv3', restaurantId: '1', name: 'Frango à Zambeziana',
    description: 'Frango marinado em leite de coco e grelhado no carvão.',
    price: 600.00, category: 'Pratos Típicos',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sv4', restaurantId: '1', name: 'Magumba Grelhada',
    description: 'Peixe magumba fresco com molho de limão e piripiri.',
    price: 350.00, category: 'Pratos Típicos',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sv5', restaurantId: '1', name: 'Pudim de Ovos',
    description: 'Sobremesa caseira com calda de caramelo artesanal.',
    price: 200.00, category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=400&q=80'
  },

  // Piri-Piri Grill (ID: 2)
  {
    id: 'pp1', restaurantId: '2', name: 'Frango Piri-Piri',
    description: 'O famoso frango grelhado com o autêntico molho piripiri da casa.',
    price: 550.00, category: 'Frango', isPopular: true,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pp2', restaurantId: '2', name: 'Prego no Pão',
    description: 'Bife tenro de vaca em pão caseiro com manteiga de alho.',
    price: 250.00, category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pp3', restaurantId: '2', name: 'Chamuças de Carne',
    description: 'Porção de 5 chamuças crocantes e bem temperadas.',
    price: 180.00, category: 'Lanches', isPopular: true,
    image: 'https://images.unsplash.com/photo-1601050638917-3606f548f2bd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pp4', restaurantId: '2', name: 'Lulas Grelhadas',
    description: 'Lulas tenras com molho de manteiga e salsa.',
    price: 750.00, category: 'Grelhados',
    image: 'https://images.unsplash.com/photo-1533682805518-48d1f5b8cd3a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pp5', restaurantId: '2', name: 'Cerveja 2M Gelada',
    description: 'Lata 330ml - A cerveja preferida de Moçambique.',
    price: 100.00, category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1535959127475-b3955a862702?auto=format&fit=crop&w=400&q=80'
  },

  // Sagres Seafood (ID: 4)
  {
    id: 'sa1', restaurantId: '4', name: 'Bacalhau à Sagres',
    description: 'Lombo de bacalhau confitado com grão-de-bico e azeitonas.',
    price: 1200.00, category: 'Peixes', isPopular: true,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sa2', restaurantId: '4', name: 'Amêijoas à Bulhão Pato',
    description: 'Amêijoas frescas salteadas com alho, coentros e azeite.',
    price: 650.00, category: 'Entradas',
    image: 'https://images.unsplash.com/photo-1544214221-5079a4055273?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sa3', restaurantId: '4', name: 'Polvo à Lagareiro',
    description: 'Tentáculos de polvo grelhados com batatas a murro.',
    price: 1550.00, category: 'Peixes', isPopular: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sa4', restaurantId: '4', name: 'Arroz de Garoupa',
    description: 'Prato reconfortante com postas frescas de garoupa.',
    price: 1100.00, category: 'Peixes',
    image: 'https://images.unsplash.com/photo-1534080391625-5778cc6e2824?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sa5', restaurantId: '4', name: 'Sorvete de Papaia',
    description: 'Refrescante sorvete artesanal de fruta da época.',
    price: 150.00, category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=400&q=80'
  },

  // Zambi (ID: 5)
  {
    id: 'za1', restaurantId: '5', name: 'Filé de Peixe Zambi',
    description: 'Filé de peixe branco com crosta de amêndoa e molho de camarão.',
    price: 1350.00, category: 'Gourmet', isPopular: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'za2', restaurantId: '5', name: 'Caril de Amendoim com Pato',
    description: 'Uma reinterpretação gourmet do clássico moçambicano.',
    price: 1100.00, category: 'Pratos Típicos',
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'za3', restaurantId: '5', name: 'T-Bone Grelhado (500g)',
    description: 'Carne premium grelhada ao ponto com manteiga de ervas.',
    price: 1600.00, category: 'Gourmet', isPopular: true,
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'za4', restaurantId: '5', name: 'Salada de Polvo e Manga',
    description: 'Entrada leve com toques tropicais de Maputo.',
    price: 550.00, category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'za5', restaurantId: '5', name: 'Gin Tónico de Hibisco',
    description: 'O cocktail assinatura do Zambi.',
    price: 450.00, category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80'
  }
];
