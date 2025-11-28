import React from 'react';
import { Clock, Zap, ArrowRight, Tag } from 'lucide-react';

// --- MOCK API DATA ---
const SPECIALS_DATA = [
  {
    id: 1,
    type: "flash",
    title: "50% Off Headphones",
    subtitle: "Premium Noise Cancelling",
    bg: "bg-gradient-to-r from-indigo-600 to-purple-600",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    timer: "02:14:55"
  },
  {
    id: 2,
    type: "bogo",
    title: "Buy 1 Get 1 Free",
    subtitle: "Men's Casual Wear",
    bg: "bg-gray-900",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
    timer: null
  },
  {
    id: 3,
    type: "bundle",
    title: "Gaming Bundle",
    subtitle: "Keyboard + Mouse + Headset",
    bg: "bg-gradient-to-br from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
    timer: "12:00:00"
  }
];

const TodaysSpecial = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
        <div className="p-2 bg-yellow-100 rounded-full">
           <Zap className="w-8 h-8 text-yellow-600 fill-current animate-pulse" />
        </div>
        <div>
           <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">TODAY'S SPECIALS</h1>
           <p className="text-gray-500 font-medium">Exclusive deals for 24 hours only.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         {/* Main Large Cards */}
         {SPECIALS_DATA.slice(0, 2).map((deal) => (
            <div key={deal.id} className={`${deal.bg} rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer shadow-xl`}>
               <div className="relative z-10 max-w-sm">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-3 py-1 rounded-full text-xs mb-6 inline-flex items-center gap-2">
                     <Tag className="w-3 h-3" /> {deal.type === 'flash' ? 'FLASH SALE' : 'LIMITED OFFER'}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">{deal.title}</h2>
                  <p className="text-white/80 text-lg mb-8 font-medium">{deal.subtitle}</p>
                  
                  {deal.timer && (
                     <div className="flex items-center gap-3 mb-8 bg-black/20 w-max px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        <span className="font-mono font-bold text-lg tracking-widest">{deal.timer}</span>
                     </div>
                  )}
                  
                  <button className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 transition flex items-center gap-2 group-hover:gap-4">
                     Shop Now <ArrowRight className="w-5 h-5" />
                  </button>
               </div>
               
               {/* Decorative Image */}
               <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="absolute -right-20 bottom-0 w-80 md:w-96 object-contain opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700" 
               />
               
               {/* Decorative Gradient Blob */}
               <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            </div>
         ))}
      </div>

      {/* Secondary Banner */}
      {SPECIALS_DATA[2] && (
         <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 bg-white rounded-xl shadow-sm p-2 flex items-center justify-center">
                  <img src={SPECIALS_DATA[2].image} className="w-full h-full object-contain" alt="Bundle" />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-gray-900">{SPECIALS_DATA[2].title}</h3>
                  <p className="text-gray-500">{SPECIALS_DATA[2].subtitle}</p>
               </div>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto">
               <div className="text-center bg-white border border-gray-200 px-4 py-2 rounded-lg">
                  <span className="block text-xs font-bold text-gray-400 uppercase">Expires in</span>
                  <span className="font-mono font-bold text-red-500">{SPECIALS_DATA[2].timer}</span>
               </div>
               <button className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
                  Grab Deal
               </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default TodaysSpecial;