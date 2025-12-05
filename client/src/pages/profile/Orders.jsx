import React from 'react';
import { Package, ChevronRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const ORDERS_DATA = [
  {
    id: "ORD-928374",
    date: "Today, 10:30 AM",
    total: 34800, // INR
    status: "In Transit",
    items: ["Sony WH-1000XM5 Wireless"],
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "ORD-882109",
    date: "Nov 24, 2023",
    total: 1299,
    status: "Delivered",
    items: ["Fresh Organic Bananas", "Whole Milk", "Eggs"],
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: "ORD-776212",
    date: "Nov 15, 2023",
    total: 4999,
    status: "Cancelled",
    items: ["Nike Air Force 1"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&q=80"
  }
];

const Orders = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
           <Link to="/profile" className="text-gray-600 hover:text-black">←</Link>
           <h1 className="text-lg font-bold text-gray-900">Your Orders</h1>
        </div>
        <button className="p-2 bg-gray-100 rounded-full"><Search className="w-5 h-5 text-gray-600" /></button>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl">
        
        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-2">
           {["All", "In Transit", "Delivered", "Cancelled"].map((status, i) => (
              <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border ${i === 0 ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                 {status}
              </button>
           ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
           {ORDERS_DATA.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                 <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                       <img src={order.image} alt="Order" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 text-sm truncate max-w-[150px] md:max-w-xs">{order.items[0]} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                             order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                             order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                             {order.status}
                          </span>
                       </div>
                       <p className="text-xs text-gray-500 mb-3">Order #{order.id} • {order.date}</p>
                       <div className="flex justify-between items-end border-t border-gray-50 pt-3">
                          <span className="font-bold text-gray-900 text-sm">₹{order.total.toLocaleString()}</span>
                          <span className="text-blue-600 text-xs font-bold flex items-center gap-1 group-hover:underline">
                             View Details <ChevronRight className="w-3 h-3" />
                          </span>
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;