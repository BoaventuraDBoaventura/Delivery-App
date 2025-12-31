
export type UserRole = 'super_admin' | 'admin' | 'owner' | 'customer' | 'driver';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
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
  location: Location;
  ownerId: string;
}

export interface CartItem extends Dish {
  quantity: number;
  notes?: string;
  selectedOptions?: string[];
  fulfillmentMethod?: 'delivery' | 'pickup';
}

export type OrderStatus = 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  customerLocation: Location;
  driverLocation?: Location;
}
