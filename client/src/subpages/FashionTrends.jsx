import React from 'react';
import { Filter, ChevronDown, Heart, Star, ShoppingBag } from 'lucide-react';
import allProducts from '../data/products.json';

const FashionTrends = () => {
  const fashionItems = allProducts.filter(item => item.category === 'fashion');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">New Collection</span>
          <h1 className="text-3xl font-black text-gray-900">Fashion & Trends</h1>
          <p className="text-gray-500 text-sm mt-1">{fashionItems.length} styles available</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:border-gray-800 transition-colors bg-white">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold hover:border-gray-800 transition-colors bg-white">
            Sort by: Newest <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fashionItems.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
               <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
               
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                  <button className="text-white hover:text-pink-400 transition"><Heart className="w-6 h-6" /></button>
                  <button className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:bg-gray-100 transition"><ShoppingBag className="w-5 h-5" /></button>
               </div>

               {item.tag && (
                 <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-bold px-2 py-1 rounded text-gray-900 uppercase tracking-wide">
                   {item.tag}
                 </span>
               )}
            </div>
            
            <div className="space-y-1">
               <span className="text-xs text-gray-500 font-bold uppercase">{item.brand}</span>
               <h3 className="font-bold text-gray-900 leading-tight group-hover:text-pink-600 transition-colors">{item.name}</h3>
               <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                     <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {item.rating}
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionTrends;