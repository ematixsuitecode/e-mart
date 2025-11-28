import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

// --- Subpage Imports (From your specific path) ---

import Electronics from "./subpages/electronics.jsx";
import FashionTrends from "./subpages/FashionTrends";
import HomesFurniture from "./subpages/HomesFurniture";
import TvsAppliances from "./subpages/TvsAppliances";
import Grocery from "./subpages/grocery.jsx";
import TodaysSpecial from "./subpages/TodaysSpecial";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// --- Utility Component: Scroll to Top on Route Change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      {/* Resets scroll position on navigation */}
      <ScrollToTop />
      
      {/* Main Layout Wrapper - Ensures Sticky Footer */}
      <div className="flex flex-col min-h-screen bg-white">
        
        <Navbar />
        
        {/* Content Area */}
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

            {/* Category Subpages */}
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/fashion-trends" element={<FashionTrends />} />
            <Route path="/homes-furniture" element={<HomesFurniture />} />
            <Route path="/tvs-appliances" element={<TvsAppliances />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/todays-special" element={<TodaysSpecial />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}