// // src/subpages/electronics/ProductCard.jsx
// import React from "react";
// import { Heart, Star } from "lucide-react";

// /**
//  * ProductCard
//  * Props:
//  *  - product: object
//  *  - formatPrice: function
//  */

// const ProductCard = ({
//   product = {},
//   formatPrice = (v) => `₹${Math.round(v * 84)}`,
// }) => {
//   const { image, name, brand, specs, rating, reviews = 0, price = 0 } = product;

//   return (
//     <div className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col h-full">
//       {/* wishlist */}
//       <div className="absolute top-3 right-3 z-10">
//         <button className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-50">
//           <Heart className="w-5 h-5" />
//         </button>
//       </div>

//       {/* image */}
//       <div className="aspect-square mb-4 relative overflow-hidden flex items-center justify-center p-2">
//         <img
//           src={image}
//           alt={name}
//           loading="lazy"
//           className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
//         />
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wide">
//           {brand}
//         </div>
//         <h3
//           className="font-medium text-gray-900 text-sm leading-snug mb-1 hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors"
//           title={name}
//         >
//           {name}
//         </h3>

//         {specs && (
//           <ul className="text-[10px] text-gray-500 list-disc list-inside mb-2 opacity-80">
//             {specs.ram && <li>{specs.ram} RAM</li>}
//             {specs.display && <li className="truncate">{specs.display}</li>}
//           </ul>
//         )}

//         <div className="flex items-center gap-2 mb-3">
//           <span className="bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
//             {rating} <Star className="w-3 h-3" />
//           </span>
//           <span className="text-xs text-gray-400 font-medium">
//             ({Number(reviews).toLocaleString()})
//           </span>
//         </div>

//         <div className="mt-auto pt-2 flex justify-between items-end border-t border-gray-50">
//           <div className="flex flex-col">
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-gray-900">
//                 {formatPrice(price)}
//               </span>
//               {price > 500 && (
//                 <span className="text-xs line-through text-gray-400">
//                   {formatPrice(price * 1.2)}
//                 </span>
//               )}
//             </div>
//             <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
//               Free delivery
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// src/subpages/electronics/ProductCard.jsx
import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";

/**
 * Simple card matching reference:
 * square image, short title, small specs, price, rating, actions
 */
const ProductCard = ({
  product,
  formatPrice = (v) => `₹${Math.round(v * 84)}`,
}) => {
  const image =
    product.image ||
    `https://source.unsplash.com/400x400/?product,${
      product.name.split(" ")[0] || "tech"
    }`;

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-transform transform group">
      <div className="relative aspect-square mb-3 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <button className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-rose-500" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">
          {product.brand}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="text-[12px] text-gray-500 mb-3">
          {product.specs && (
            <>
              {product.specs.ram && (
                <div>
                  {product.specs.ram} •{" "}
                  {product.specs.storage ?? product.specs.internal_storage}
                </div>
              )}
              {!product.specs.ram && product.specs.type && (
                <div>{product.specs.type}</div>
              )}
            </>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-50">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(
                product.price ?? product.priceUsd ?? product.priceINR ?? 0
              )}
            </div>
            <div className="text-xs text-green-600 font-semibold">
              Free delivery
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-green-700 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
              {product.rating ?? 4} <Star className="w-3 h-3" />
            </div>
            <button className="mt-2 bg-indigo-50 text-indigo-600 p-2 rounded-md hover:bg-indigo-600 hover:text-white transition">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
