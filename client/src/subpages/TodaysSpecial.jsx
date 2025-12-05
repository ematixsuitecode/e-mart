import React, { useState, useRef } from 'react';
import { Clock, Zap, ArrowRight, Tag, Gift, X } from 'lucide-react';

const SPECIALS_DATA = [
  { id: 1, type: "flash", title: "50% Off Headphones", subtitle: "Premium Noise Cancelling", bg: "bg-gradient-to-r from-indigo-600 to-purple-600", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", timer: "02:14:55" },
  { id: 2, type: "bogo", title: "Buy 1 Get 1 Free", subtitle: "Men's Casual Wear", bg: "bg-gray-900", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80", timer: null },
  { id: 3, type: "bundle", title: "Gaming Bundle", subtitle: "Keyboard + Mouse + Headset", bg: "bg-gradient-to-br from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80", timer: "12:00:00" }
];

const LuckDraw = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const wheelRef = useRef(null);

  const prizes = [
    { label: "5% OFF", color: "#EF4444", code: "LUCK5" },
    { label: "10% OFF", color: "#F59E0B", code: "LUCK10" },
    { label: "15% OFF", color: "#10B981", code: "LUCK15" },
    { label: "1+1 DEAL", color: "#3B82F6", code: "BOGO" },
    { label: "TRY AGAIN", color: "#6B7280", code: null },
    { label: "₹50 CASH", color: "#8B5CF6", code: "CASH50" }
  ];

  const spinWheel = () => {
    if (isSpinning || result) return;
    
    setIsSpinning(true);
    const randomStop = Math.floor(Math.random() * 360) + 1800; // At least 5 spins (360*5)
    
    if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${randomStop}deg)`;
    }

    setTimeout(() => {
        setIsSpinning(false);
        // Simplified result logic (random for demo)
        const wonPrize = prizes[Math.floor(Math.random() * prizes.length)];
        setResult(wonPrize);
    }, 3000); // 3s spin duration
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-12 overflow-hidden relative">
       
       {/* Left: Text */}
       <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
             <Gift className="w-4 h-4" /> Daily Luck Draw
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Spin & Win Big!</h2>
          <p className="text-gray-500 mb-6">Try your luck daily to win exclusive discount codes, cashback, and special offers.</p>
          <button 
            onClick={spinWheel} 
            disabled={isSpinning || result}
            className={`bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-black transition transform active:scale-95 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
             {isSpinning ? 'Spinning...' : result ? 'Come Back Tomorrow' : 'Spin Now'}
          </button>
       </div>

       {/* Right: The Wheel */}
       <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-600 drop-shadow-md"></div>
          
          {/* Wheel Circle */}
          <div 
            ref={wheelRef}
            className="w-full h-full rounded-full border-8 border-white shadow-2xl relative overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.25, 0.1, 0.25, 1)"
            style={{ background: 'conic-gradient(#EF4444 0deg 60deg, #F59E0B 60deg 120deg, #10B981 120deg 180deg, #3B82F6 180deg 240deg, #6B7280 240deg 300deg, #8B5CF6 300deg 360deg)' }}
          >
             {/* Segments (Visual Only) */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-inner z-10 flex items-center justify-center">
                   <Zap className="w-8 h-8 text-yellow-500 fill-current" />
                </div>
             </div>
          </div>
       </div>

       {/* Result Modal Overlay */}
       {result && (
          <div className="absolute inset-0 bg-black/80 z-50 flex flex-col items-center justify-center text-center animate-fade-in p-6 rounded-3xl">
             <div className="bg-white p-8 rounded-2xl max-w-sm w-full relative">
                <button onClick={() => setResult(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X className="w-6 h-6" /></button>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Gift className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
                <p className="text-gray-500 mb-4">You won <span className="font-bold text-black">{result.label}</span></p>
                {result.code && (
                   <div className="bg-gray-100 border border-dashed border-gray-300 p-3 rounded-lg font-mono font-bold text-lg text-indigo-600 tracking-wider mb-4">
                      {result.code}
                   </div>
                )}
                <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700">Claim Reward</button>
             </div>
          </div>
       )}
    </div>
  );
};

const TodaysSpecial = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
        <div className="p-2 bg-yellow-100 rounded-full">
           <Zap className="w-8 h-8 text-yellow-600 fill-current animate-pulse" />
        </div>
        <div>
           <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic tracking-tight">TODAY'S SPECIALS</h1>
           <p className="text-gray-500 font-medium">Exclusive deals & games for 24 hours only.</p>
        </div>
      </div>

      <LuckDraw />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         {/* Main Large Cards */}
         {SPECIALS_DATA.slice(0, 2).map((deal) => (
            <div key={deal.id} className={`${deal.bg} rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer shadow-xl min-h-[300px]`}>
               <div className="relative z-10 max-w-sm">
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-3 py-1 rounded-full text-xs mb-6 inline-flex items-center gap-2">
                     <Tag className="w-3 h-3" /> {deal.type === 'flash' ? 'FLASH SALE' : 'LIMITED OFFER'}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{deal.title}</h2>
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
                  className="absolute -right-20 bottom-0 w-64 md:w-96 object-contain opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700" 
               />
            </div>
         ))}
      </div>
    </div>
  );
};

export default TodaysSpecial;



// import React from "react";
// import { Clock, Zap, ArrowRight, Tag } from "lucide-react";

// // --- MOCK API DATA ---
// const SPECIALS_DATA = [
//   {
//     id: 1,
//     type: "flash",
//     title: "50% Off Headphones",
//     subtitle: "Premium Noise Cancelling",
//     bg: "bg-gradient-to-r from-indigo-600 to-purple-600",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
//     timer: "02:14:55",
//   },
//   {
//     id: 2,
//     type: "bogo",
//     title: "Buy 1 Get 1 Free",
//     subtitle: "Men's Casual Wear",
//     bg: "bg-gray-900",
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
//     timer: null,
//   },
//   {
//     id: 3,
//     type: "bundle",
//     title: "Gaming Bundle",
//     subtitle: "Keyboard + Mouse + Headset",
//     bg: "bg-gradient-to-br from-orange-500 to-red-600",
//     image:
//       "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
//     timer: "12:00:00",
//   },
// ];

// const TodaysSpecial = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
//         <div className="p-2 bg-yellow-100 rounded-full">
//           <Zap className="w-8 h-8 text-yellow-600 fill-current animate-pulse" />
//         </div>
//         <div>
//           <h1 className="text-4xl font-black text-gray-900 italic tracking-tight">
//             TODAY'S SPECIALS
//           </h1>
//           <p className="text-gray-500 font-medium">
//             Exclusive deals for 24 hours only.
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         {/* Main Large Cards */}
//         {SPECIALS_DATA.slice(0, 2).map((deal) => (
//           <div
//             key={deal.id}
//             className={`${deal.bg} rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group cursor-pointer shadow-xl`}
//           >
//             <div className="relative z-10 max-w-sm">
//               <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-3 py-1 rounded-full text-xs mb-6 inline-flex items-center gap-2">
//                 <Tag className="w-3 h-3" />{" "}
//                 {deal.type === "flash" ? "FLASH SALE" : "LIMITED OFFER"}
//               </span>
//               <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
//                 {deal.title}
//               </h2>
//               <p className="text-white/80 text-lg mb-8 font-medium">
//                 {deal.subtitle}
//               </p>

//               {deal.timer && (
//                 <div className="flex items-center gap-3 mb-8 bg-black/20 w-max px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10">
//                   <Clock className="w-5 h-5 text-yellow-400" />
//                   <span className="font-mono font-bold text-lg tracking-widest">
//                     {deal.timer}
//                   </span>
//                 </div>
//               )}

//               <button className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-gray-100 transition flex items-center gap-2 group-hover:gap-4">
//                 Shop Now <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Decorative Image */}
//             <img
//               src={deal.image}
//               alt={deal.title}
//               className="absolute -right-20 bottom-0 w-80 md:w-96 object-contain opacity-50 mix-blend-overlay group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700"
//             />

//             {/* Decorative Gradient Blob */}
//             <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
//           </div>
//         ))}
//       </div>

//       {/* Secondary Banner */}
//       {SPECIALS_DATA[2] && (
//         <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition">
//           <div className="flex items-center gap-6">
//             <div className="w-24 h-24 bg-white rounded-xl shadow-sm p-2 flex items-center justify-center">
//               <img
//                 src={SPECIALS_DATA[2].image}
//                 className="w-full h-full object-contain"
//                 alt="Bundle"
//               />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-gray-900">
//                 {SPECIALS_DATA[2].title}
//               </h3>
//               <p className="text-gray-500">{SPECIALS_DATA[2].subtitle}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-6 w-full md:w-auto">
//             <div className="text-center bg-white border border-gray-200 px-4 py-2 rounded-lg">
//               <span className="block text-xs font-bold text-gray-400 uppercase">
//                 Expires in
//               </span>
//               <span className="font-mono font-bold text-red-500">
//                 {SPECIALS_DATA[2].timer}
//               </span>
//             </div>
//             <button className="flex-1 md:flex-none bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition">
//               Grab Deal
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodaysSpecial;
