import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit3, Home, Briefcase, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      tag: "Home",
      name: "krishna",
      line1: "Flat 402, Sunshine Apartments",
      line2: "Anna Nagar, 3rd Avenue",
      city: "Chennai",
      pincode: "600040",
      phone: "9876543210",
      isDefault: true
    },
    {
      id: 2,
      tag: "Work",
      name: "krishna",
      line1: "Ematix Solutions, Tech Park",
      line2: "OMR Road, Sholinganallur",
      city: "Salem",
      pincode: "600119",
      phone: "9876543210",
      isDefault: false
    }
  ]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <Link to="/profile" className="text-gray-600 hover:text-black">←</Link>
        <h1 className="text-lg font-bold text-gray-900">My Addresses</h1>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        
        {/* Add New Button */}
        <button className="w-full bg-white border border-indigo-100 text-indigo-600 font-bold py-4 rounded-xl border-dashed mb-6 flex items-center justify-center gap-2 hover:bg-indigo-50 transition active:scale-95 shadow-sm">
           <Plus className="w-5 h-5" /> Add New Address
        </button>

        {/* Address List */}
        <div className="space-y-4">
           {addresses.map((addr) => (
              <div key={addr.id} className={`bg-white p-5 rounded-xl border transition-all ${addr.isDefault ? 'border-indigo-500 shadow-md ring-1 ring-indigo-100' : 'border-gray-200 shadow-sm'}`}>
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                       <span className="bg-gray-100 text-gray-600 p-1.5 rounded-md">
                          {addr.tag === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                       </span>
                       <span className="font-bold text-gray-900 text-sm uppercase tracking-wide">{addr.tag}</span>
                       {addr.isDefault && <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full">DEFAULT</span>}
                    </div>
                    
                    <div className="flex gap-2">
                       <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition"><Edit3 className="w-4 h-4" /></button>
                       <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 </div>

                 <div className="pl-9">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{addr.name} &nbsp;<span className="font-normal text-gray-500">{addr.phone}</span></h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                       {addr.line1}, {addr.line2}, <br/>
                       {addr.city} - <span className="font-medium text-gray-900">{addr.pincode}</span>
                    </p>
                 </div>
              </div>
           ))}
        </div>

      </div>
    </div>
  );
};

export default Addresses;