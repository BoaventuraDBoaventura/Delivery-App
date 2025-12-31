
export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPopular?: boolean;
  calories?: number;
  rating?: number;
  reviewsCount?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewsCount: string;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
  logo: string;
  isVerified: boolean;
  tags: string[];
}

export interface CartItem extends Dish {
  quantity: number;
  notes?: string;
  selectedOptions?: string[];
}

export type OrderStatus = 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
}
