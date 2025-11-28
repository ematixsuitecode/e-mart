import React from 'react';
import { 
  Facebook, Twitter, Instagram, Youtube, 
  CreditCard, Smartphone, Mail, MapPin, Phone, 
  ChevronUp, ArrowRight 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 font-sans mt-auto">
      
      {/* 1. Back to Top Button (Amazon Style) */}
      <button 
        onClick={scrollToTop} 
        className="w-full bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-3 transition-colors duration-200 flex justify-center items-center gap-2 border-b border-gray-700"
      >
        <ChevronUp className="w-4 h-4" /> Back to top
      </button>

      {/* 2. Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-2xl font-black tracking-tighter text-white">
                NOVA<span className="text-indigo-500">MARKET</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              The ultimate shopping destination for fashion, electronics, and home essentials. 
              Quality products delivered at lightning speed.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>123 Commerce Avenue, Tech Park,<br/>Chennai, Tamil Nadu 600028</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                <a href="mailto:support@novamarket.com" className="hover:text-white transition-colors">support@novamarket.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>+91 1800-123-4567</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Shop & Learn</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">New Arrivals</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Best Sellers</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Career</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Help Desk</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Track Your Order</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Shipping Info</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">Dispute Resolution</a></li>
              <li><a href="#" className="hover:text-indigo-400 hover:translate-x-1 transition-all inline-block">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & App */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
            
            <div className="flex gap-2 mb-8">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <h5 className="text-white text-sm font-bold mb-3">Experience the Nova App</h5>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-all w-full justify-center">
                <Smartphone className="w-5 h-5 text-gray-300" />
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-400 uppercase">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-3 py-2 rounded-lg transition-all w-full justify-center">
                <Smartphone className="w-5 h-5 text-gray-300" />
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-400 uppercase">Download on</div>
                  <div className="text-xs font-bold text-white">App Store</div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Bottom Bar: Copyright & Payment */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
               <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
               <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
               <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
               <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"><Youtube className="w-4 h-4" /></a>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500 text-center">
              &copy; {new Date().getFullYear()} NovaMarket Inc. All rights reserved.
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
              <CreditCard className="w-6 h-6" />
              <span className="font-bold italic text-white text-lg">VISA</span>
              <span className="font-bold text-white text-lg">Mastercard</span>
              <span className="font-bold text-blue-400 text-lg">PayPal</span>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;