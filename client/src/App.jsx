import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Productpage from "./subpages/categories/electronics";
import TodaysSpecial from "./subpages/TodaysSpecial";

// NEW dynamic product page


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/order" element={<OrderPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

            {/* Category Subpages */}
            {/* <Route path="/electronics" element={<Electronics />} /> */}
            {/* <Route path="/fashion-trends" element={<FashionTrends />} />
            <Route path="/homes-furniture" element={<HomesFurniture />} />
            <Route path="/tvs-appliances" element={<TvsAppliances />} />
            <Route path="/grocery" element={<Grocery />} /> */}
            <Route path="/todays-special" element={<TodaysSpecial />} />

            {/* DYNAMIC CATEGORY ROUTE */}
            <Route path="/category/:categoryId" element={<Productpage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
