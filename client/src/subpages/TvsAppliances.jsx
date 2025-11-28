import React from 'react';
import { Zap, ShieldCheck, Truck } from 'lucide-react';
import allProducts from '../data/products.json';

const TvsAppliances = () => {
  const appliances = allProducts.filter(item => item.category === 'appliances');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-4">TVs & Home Appliances</h1>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
           <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><ShieldCheck className="w-4 h-4 text-green-600" /> Extended Warranty Available</span>
           <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><Truck className="w-4 h-4 text-blue-600" /> Free Scheduled Delivery</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {appliances.map((item) => (
          <div key={item.id} className="bg-white shadow-sm border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group">
            <div className="w-full md:w-64 h-48 bg-gray-100 rounded-xl overflow-hidden shrink-0">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            
            <div className="flex-1">
               <span className="text-xs font-bold text-gray-500 uppercase">{item.brand}</span>
               <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h3>
               
               {item.specs && (
                 <div className="flex flex-wrap gap-2 mb-4">
                    {item.specs.map((spec, i) => (
                       <span key={i} className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">{spec}</span>
                    ))}
                 </div>
               )}
               
               <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> In Stock
               </div>
            </div>

            <div className="flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[150px]">
               <div className="text-right">
                  <span className="block text-2xl font-bold text-gray-900">${item.price}</span>
                  <span className="text-xs text-gray-400">Free Shipping</span>
               </div>
               <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvsAppliances;