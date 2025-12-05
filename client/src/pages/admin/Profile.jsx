import React, { useState } from 'react';
import { 
  User, MapPin, Package, CreditCard, Heart, LogOut, ChevronRight, Edit2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  // Mock User Data
  const [user, setUser] = useState({
    name: "Krishna",
    email: "krishna@ematix.com",
    phone: "+91 9360113501",
    gender: "Male",
    dob: "20035-08-15"
  });

  const [isEditing, setIsEditing] = useState(false);

  const MENU_ITEMS = [
    { icon: <Package className="w-5 h-5 text-blue-600" />, label: "Your Orders", desc: "Track, return, or buy things again", path: "/profile/orders" },
    { icon: <MapPin className="w-5 h-5 text-green-600" />, label: "Addresses", desc: "Edit addresses for orders and gifts", path: "/profile/addresses" },
    { icon: <CreditCard className="w-5 h-5 text-purple-600" />, label: "Payment Methods", desc: "Manage cards and UPI", path: "/profile/payments" },
    { icon: <Heart className="w-5 h-5 text-red-500" />, label: "Wishlist", desc: "Your saved items", path: "/wishlist" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* Header (Mobile Sticky) */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200 px-4 py-3 md:py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-lg md:text-xl font-bold text-gray-900">My Account</h1>
        {/* Logout Button */}
        <button className="text-red-500 text-sm font-bold flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors">
           <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* 1. User Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors"
              >
                 <Edit2 className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 border-4 border-white shadow-sm">
                 <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
              </div>
              
              {/* Details Form (View/Edit) */}
              <div className="flex-1 w-full text-center md:text-left space-y-3">
                 {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                       <input type="text" value={user.name} className="border p-2 rounded text-sm w-full" onChange={e => setUser({...user, name: e.target.value})} placeholder="Full Name" />
                       <input type="email" value={user.email} className="border p-2 rounded text-sm w-full bg-gray-50" readOnly />
                       <input type="text" value={user.phone} className="border p-2 rounded text-sm w-full" onChange={e => setUser({...user, phone: e.target.value})} placeholder="Phone" />
                       <select value={user.gender} onChange={e => setUser({...user, gender: e.target.value})} className="border p-2 rounded text-sm w-full">
                          <option>Male</option><option>Female</option><option>Other</option>
                       </select>
                       <button onClick={() => setIsEditing(false)} className="bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold md:col-span-2">Save Changes</button>
                    </div>
                 ) : (
                    <>
                       <div>
                          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                          <p className="text-gray-500 text-sm">{user.email} • {user.phone}</p>
                       </div>
                       <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-medium text-gray-600">
                          <span className="bg-gray-100 px-3 py-1 rounded-full">{user.gender}</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-full">DOB: {user.dob}</span>
                       </div>
                    </>
                 )}
              </div>
           </div>
        </div>

        {/* 2. Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {MENU_ITEMS.map((item, idx) => (
              <Link to={item.path} key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group cursor-pointer">
                 <div className="bg-gray-50 p-3 rounded-full group-hover:bg-indigo-50 transition-colors">
                    {item.icon}
                 </div>
                 <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">{item.label}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                 </div>
                 <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
              </Link>
           ))}
        </div>

        {/* 3. Zepto-Style Quick Links */}
        <div className="mt-8">
           <h3 className="text-sm font-bold text-gray-900 mb-4 px-1">More Options</h3>
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {["Notifications", "Settings", "Help & Support", "About Us"].map((link, i) => (
                 <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition">
                    <span className="text-sm text-gray-700 font-medium">{link}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
