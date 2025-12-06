import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Zap,
  Heart,
  Menu,
  ChevronDown,
} from "lucide-react";

// Import master JSON dynamically
import productsMaster from "../../data/products.json";

// Dynamic categories
const CATEGORY_LINKS = Object.keys(productsMaster)
  .filter((key) => key !== "filters")
  .map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, " "),
    path: `/category/${key}`,
  }));

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white font-sans shadow-lg transition-all duration-300">
      {/* =================== TOP STRIP =================== */}
      {/* <div className="bg-gray-50 text-gray-600 text-[11px] font-medium py-1.5 px-4 
                      flex justify-between items-center border-b border-gray-200">

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-indigo-700 font-bold bg-indigo-50 
                           px-2 py-0.5 rounded-sm">
            <Zap className="w-3 h-3 fill-current" /> Brand Week
          </span>

          <span className="hidden sm:inline text-gray-500">
            Get extra 10% off on HDFC Cards • Ends in 12h 45m
          </span>
        </div>

        <div className="flex gap-5 items-center">

          {/* ⭐ REMOVED LOGIN OPTION HERE */}

      {/* <Link to="/sell" className="hover:text-indigo-600 transition-colors">
            Sell
          </Link>

          <Link to="/app" className="hover:text-indigo-600 transition-colors">
            Download App
          </Link>

          <Link to="/help" className="hover:text-indigo-600 transition-colors">
            Help Center
          </Link>
        </div>
      </div>  */}

      {/* =================== MAIN HEADER =================== */}
      <div className="bg-white py-3 px-4 md:px-8 flex items-center gap-4 md:gap-8 relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer min-w-max group"
        >
          <div
            className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-md 
                          group-hover:bg-indigo-700 transition-colors"
          >
            <Zap className="w-5 h-5 fill-current" />
          </div>

          <span
            className="text-2xl font-black tracking-tighter text-gray-900 
                           group-hover:text-indigo-900 transition-colors"
          >
            EMATIX<span className="text-indigo-500">MARKET</span>
          </span>
        </Link>

        {/* Location */}
        <div
          className="hidden lg:flex flex-col leading-tight cursor-pointer hover:bg-gray-50 p-2 
                        rounded-lg transition-all duration-200 group"
        >
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Delivering to
          </span>

          <div className="flex items-center gap-1 text-gray-700 font-bold text-sm">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>Salem, 636007</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative z-20">
          <div className="relative group">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="w-full border-2 border-gray-100 bg-gray-50 py-2.5 pl-5 pr-12 
                         rounded-xl focus:outline-none focus:border-indigo-500 
                         focus:bg-white focus:shadow-lg text-gray-700 font-medium 
                         placeholder-gray-400"
            />

            <button
              className="absolute right-2 top-1.5 bg-indigo-50 text-indigo-600 
                               p-1.5 rounded-lg hover:bg-indigo-600 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =================== ICONS & LOGIN BUTTON =================== */}
        <div className="flex items-center gap-3 md:gap-6 text-gray-600 ml-auto md:ml-0">
          {/* ⭐ Flipkart-style Login Button */}
          <Link
            to="/login"
            className="hidden md:block px-6 py-2 font-bold rounded-lg 
                       bg-white border border-indigo-600 text-indigo-600 
                       hover:bg-indigo-600 hover:text-white 
                       transition-all shadow-sm"
          >
            Login
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="hidden md:flex flex-col items-center p-2 hover:bg-indigo-50"
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="hidden md:flex flex-col items-center p-2 hover:bg-rose-50 relative"
          >
            <Heart className="w-6 h-6" />
            <span className="text-[10px] font-bold">Saved</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex flex-col items-center p-2 hover:bg-gray-100 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-[10px] font-bold">Cart</span>
            <span
              className="absolute -top-0.5 right-0.5 bg-yellow-400 text-indigo-900 
                             text-[10px] w-5 h-5 flex items-center justify-center rounded-full 
                             border-2 border-white"
            >
              2
            </span>
          </Link>
        </div>
      </div>

      {/* =================== SUB NAV =================== */}
      <div className="bg-indigo-900 text-white shadow-inner relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar text-sm font-medium">
            <Link
              to="/products"
              className="flex items-center gap-2 py-3 px-3 mr-4 hover:bg-white/10 
                         border-r border-indigo-800 pr-6"
            >
              <Menu className="w-5 h-5" />
              <span className="font-bold">All Categories</span>
              <ChevronDown className="w-3 h-3" />
            </Link>

            {/* Dynamic categories */}
            <div className="flex items-center gap-1">
              {CATEGORY_LINKS.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="py-3 px-4 whitespace-nowrap text-indigo-100 
                             hover:bg-white/10 hover:text-white rounded-md"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              to="/todays-special"
              className="ml-auto py-3 px-4 text-yellow-300 font-bold hover:bg-white/10 
                         flex items-center gap-2"
            >
              <Zap className="w-4 h-4 animate-pulse" />
              Today's Special
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
