import React from 'react';
import { Clock } from 'lucide-react';
import allProducts from '../data/products.json';

const Grocery = () => {
  const groceryItems = allProducts.filter(item => item.category === 'grocery');

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
             <div className="bg-green-100 p-2 rounded-full text-green-700"><Clock className="w-5 h-5" /></div>
             <div>
                <p className="text-green-900 font-bold text-sm">Express Delivery in 15 Minutes</p>
                <p className="text-green-700 text-xs">Delivering fresh to <b>Chennai, 600028</b></p>
             </div>
          </div>
          <button className="text-green-700 font-bold text-sm hover:underline">Change</button>
       </div>
       
       <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">Daily Essentials <span className="text-sm font-normal text-gray-400">({groceryItems.length} items)</span></h1>
       
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {groceryItems.map(item => (
             <div key={item.id} className="border border-gray-100 p-4 rounded-xl hover:border-green-500 hover:shadow-lg cursor-pointer transition-all bg-white group flex flex-col h-full">
                <div className="h-28 bg-gray-50 rounded-lg mb-3 flex items-center justify-center p-2">
                   <img src={item.image} alt={item.name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                </div>
                
                <div className="flex-1">
                   <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1 line-clamp-2">{item.name}</h3>
                   <p className="text-xs text-gray-500 mb-3">{item.unit}</p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                   <span className="font-bold text-gray-900">${item.price}</span>
                   <button className="border border-green-500 text-green-600 px-3 py-1 rounded text-xs font-bold hover:bg-green-50 uppercase">
                      Add
                   </button>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default Grocery;