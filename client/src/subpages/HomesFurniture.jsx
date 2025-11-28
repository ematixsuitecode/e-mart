import React from 'react';
import { ArrowRight } from 'lucide-react';
import allProducts from '../data/products.json';

const HomesFurniture = () => {
  const furnitureItems = allProducts.filter(item => item.category === 'furniture');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="bg-orange-50 rounded-2xl p-8 md:p-12 mb-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
         <div className="relative z-10 max-w-lg">
            <span className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-2 block">Interior Design</span>
            <h1 className="text-4xl md:text-5xl font-black text-orange-900 mb-4 leading-tight">Elevate Your Living Space</h1>
            <p className="text-orange-800/80 text-lg mb-8">Discover our hand-picked collection of premium furniture designed for modern homes.</p>
            <button className="bg-orange-900 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-800 transition flex items-center gap-2">
               Shop Collection <ArrowRight className="w-5 h-5" />
            </button>
         </div>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {furnitureItems.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
               <div className="h-64 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </div>
               <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                     <span className="text-lg font-bold text-gray-900">${item.price}</span>
                     <button className="text-orange-600 font-bold text-sm hover:underline">View Details</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default HomesFurniture;