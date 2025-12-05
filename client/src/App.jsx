import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// USER PAGES
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Productpage from "./subpages/categories/electronics";
import TodaysSpecial from "./subpages/TodaysSpecial";

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminProductPage from './pages/admin/ProductPage.jsx'
import AdminSettingPAge from './pages/admin/SettingsPage.jsx'
import AdminCustomerPage from './pages/admin/CustomersPage.jsx'
import AdminOrderPage from './pages/admin/OrderPage.jsx'

import HomeOutlet from "./pages/HomeOutlet.jsx";
import AdminOutlet from "./pages/AdminOutlet.jsx";
import Profile from "./pages/admin/Profile.jsx";
import OfferPage from "./pages/admin/OfferPage.jsx";
import Store99 from "./subpages/Store99.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* USER ROUTES */}
        <Route path="/" element={<HomeOutlet />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="todays-special" element={<TodaysSpecial />} />
          <Route path="category/:categoryId" element={<Productpage />} />
          <Route path="99store" element={<Store99 />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminOutlet />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductPage />} />
          <Route path="orders" element={<AdminOrderPage />} />
          <Route path="customers" element={<AdminCustomerPage />} />
          <Route path="settings" element={<AdminSettingPAge />} />
          <Route path="offer" element={<OfferPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
