import React, { useEffect, useState } from 'react';
import { ShoppingCart, Star, Search, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomFetch from '../utils/CustomFetch';

const formatINR = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Store99 = () => {
  const [offerList, setOfferList] = useState([]);

  const load99StoreOffers = async () => {
    try {
      const res = await CustomFetch.get("/offer/99_store");
      setOfferList(res.data.data || []);
    } catch (error) {
      console.log("Failed to fetch 99 store offers", error);
    }
  };

  useEffect(() => {
    load99StoreOffers();
  }, []);

  /** PER-PRODUCT OFFER LOGIC */
  const getProductStatus = (offer) => {
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);
    const now = new Date();

    // 🔴 Expired product → remove
    if (now > end) return { show: false };

    // 🟡 Before start date
    if (now < start) {
      const daysLeft = Math.ceil((start - now) / (1000 * 60 * 60 * 24));

      if (daysLeft > 5) return { show: false }; // Hide if > 5 days left

      return { show: true, type: "soon", daysLeft, active: false };
    }

    // 🟢 Active offer
    return {
      show: true,
      type: "active",
      endDate: end.toLocaleDateString("en-IN"),
      active: true
    };
  };

  return (
    <div className="bg-yellow-50 min-h-screen font-sans pb-12">

      {/* Header */}
      <div className="bg-yellow-400 py-4 px-4 sticky top-[64px] z-20 shadow-md flex items-center gap-3">
        <Link to="/" className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
          <ArrowLeft className="w-6 h-6 text-red-700" />
        </Link>
        <h1 className="text-xl md:text-2xl font-black text-red-700 uppercase tracking-widest">
          The 99 Store
        </h1>
      </div>

      {/* Hero */}
      <div className="bg-yellow-400 pb-12 pt-4 text-center relative mb-8">
        <h2 className="text-5xl md:text-8xl font-black text-red-600 transform -rotate-2">
          UNDER ₹99
        </h2>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">

        {offerList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {offerList.map((offer) =>
              offer.productIds.map((p) => {
                const status = getProductStatus(offer);

                if (!status.show) return null; // Skip hidden/expired

                return (
                  <div
                    key={p._id}
                    className="bg-white rounded-xl border-2 border-yellow-200 hover:border-yellow-400 shadow-sm hover:shadow-xl overflow-hidden group flex flex-col relative"
                  >

                    {/* STEAL DEAL Badge */}
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] px-2 py-1 rounded-br-lg font-bold">
                      STEAL DEAL
                    </div>

                    {/* Image */}
                    <div className="aspect-square bg-white mt-3 p-4 flex justify-center">
                      <img
                        src={p.imageUrl?.[0]?.url}
                        alt={p.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-3 flex flex-col flex-1">

                      {/* Product name */}
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10">
                        {p.name}
                      </h3>

                      {/* STATUS BELOW PRODUCT TITLE */}
                      {status.type === "soon" && (
                        <p className="text-[12px] font-bold text-orange-600 mt-1">
                          Coming Soon (⏳ {status.daysLeft} days)
                        </p>
                      )}

                      {status.type === "active" && (
                        <p className="text-[12px] font-bold text-red-600 mt-1">
                          Ends On: {status.endDate}
                        </p>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] text-gray-500 font-bold">{p.ratings}</span>
                      </div>

                      {/* Pricing */}
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-dashed">
                        <div className="flex flex-col leading-none">
                          <span className="text-[11px] text-gray-400 line-through">
                            {formatINR(p.price)}
                          </span>
                          <span className="text-xl font-black text-red-600">
                            ₹{offer.specialPrice}
                          </span>
                        </div>

                        {/* Add to cart */}
                        <button
                          disabled={!status.active}
                          className={`p-2 rounded-full transition shadow-sm ${
                            status.active
                              ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 hover:text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {status.active ? (
                            <ShoppingCart className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })
            )}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-yellow-300 border-dashed bg-white rounded-xl">
            <Search className="w-16 h-16 text-yellow-300 mb-4" />
            <h3 className="text-xl font-bold text-yellow-800">Stock Cleared!</h3>
            <p className="text-yellow-700">Check back later for more 99 Store deals.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Store99;


// import React, { useEffect, useState } from 'react';
// import { ShoppingCart, Star, Zap, Search, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import allProducts from '../data/products.json';
// import CustomFetch from '../utils/CustomFetch';

// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     maximumFractionDigits: 0,
//   }).format(price * 84);
// };

// const Store99 = () => {
//    const [offerList, setOfferList] = useState(null);
//   // Filter products for 99 store (using '99store' category)
//   const store99Items = allProducts.filter(item => item.category === '99store');

//   const load99StoreOffers = async () => {
//     try {
//       const res = await CustomFetch.get("/offer/99-store");
//       setOfferList(res.data.data);
//       console.log(res.data.data);
//     } catch (error) {
//       console.log("Failed to fetch 99 store offers", error);
//     }
//   };

//   useEffect(() =>{
//    load99StoreOffers();
//   }, []);

//   return (
//     <div className="bg-yellow-50 min-h-screen font-sans pb-12">

//       {/* Header / Nav Back */}
//       <div className="bg-yellow-400 py-4 px-4 sticky top-[64px] z-20 shadow-md flex items-center gap-3">
//          <Link to="/" className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition">
//             <ArrowLeft className="w-6 h-6 text-red-700" />
//          </Link>
//          <h1 className="text-xl md:text-2xl font-black text-red-700 uppercase tracking-widest">The 99 Store</h1>
//       </div>

//       {/* Hero Banner */}
//       <div className="bg-yellow-400 pb-12 pt-4 relative overflow-hidden mb-8">
//          <div className="container mx-auto px-4 relative z-10 text-center">
//             <h2 className="text-5xl md:text-8xl font-black text-red-600 mb-2 drop-shadow-sm transform -rotate-2 leading-none">
//                UNDER ₹99
//             </h2>
//             <p className="text-yellow-900 text-lg md:text-xl font-bold uppercase tracking-widest bg-yellow-300 inline-block px-6 py-2 rounded-full border-4 border-yellow-500 shadow-lg mt-4">
//                Budget Friendly Deals
//             </p>
//          </div>
//          {/* Decorative Elements */}
//          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
//          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
//       </div>

//       <div className="container mx-auto px-4 -mt-16 relative z-10">

//          {/* Grid */}
//          {store99Items.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                {store99Items.map((product) => (
//                   <div key={product.id} className="bg-white rounded-xl border-2 border-yellow-200 shadow-sm overflow-hidden hover:shadow-xl hover:border-yellow-400 transition-all group cursor-pointer relative flex flex-col">

//                      <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 shadow-sm">
//                         STEAL DEAL
//                      </div>

//                      <div className="aspect-square bg-white p-4 flex items-center justify-center relative overflow-hidden">
//                         <img
//                            src={product.image}
//                            alt={product.name}
//                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
//                         />
//                      </div>

//                      <div className="p-3 flex flex-col flex-1">
//                         <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1 h-10 leading-snug">{product.name}</h3>

//                         <div className="flex items-center gap-1 mb-2">
//                            <div className="flex text-yellow-400 text-xs">
//                               <Star className="w-3 h-3 fill-current" />
//                            </div>
//                            <span className="text-[10px] text-gray-400 font-bold">({product.reviews})</span>
//                         </div>

//                         <div className="flex items-center justify-between mt-auto pt-2 border-t border-dashed border-gray-200">
//                            <div className="flex flex-col">
//                               <span className="text-[10px] text-gray-400 line-through">₹199</span>
//                               <span className="text-xl font-black text-red-600 leading-none">₹{(product.price * 84).toFixed(0)}</span>
//                            </div>
//                            <button className="bg-yellow-400 text-yellow-900 p-2 rounded-full hover:bg-yellow-500 hover:text-white transition shadow-sm active:scale-95 transform group-hover:rotate-12">
//                               <ShoppingCart className="w-4 h-4" />
//                            </button>
//                         </div>
//                      </div>
//                   </div>
//                ))}
//             </div>
//          ) : (
//             <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-dashed border-2 border-yellow-300">
//                <Search className="w-16 h-16 text-yellow-300 mb-4" />
//                <h3 className="text-xl font-bold text-yellow-800">Stock Cleared!</h3>
//                <p className="text-yellow-700">Check back later for more 99 Store deals.</p>
//             </div>
//          )}
//       </div>
//     </div>
//   );
// };

// export default Store99;
