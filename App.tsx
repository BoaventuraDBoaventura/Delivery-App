
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import Home from './screens/Home';
import RestaurantProfile from './screens/RestaurantProfile';
import DishDetail from './screens/DishDetail';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import OrderStatus from './screens/OrderStatus';
import OrderHistory from './screens/OrderHistory';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import Notifications from './screens/Notifications';
import RestaurantRegistration from './screens/RestaurantRegistration';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex flex-col h-full bg-background relative overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantProfile />} />
            <Route path="/restaurant-registration" element={<RestaurantRegistration />} />
            <Route path="/dish/:id" element={<DishDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;
