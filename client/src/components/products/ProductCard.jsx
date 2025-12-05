// src/components/products/ProductCard.jsx
import React, { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import CustomFetch from "../../utils/CustomFetch";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const images = product.imageUrl || [];
  const [index, setIndex] = useState(0);

  const [isFav, setIsFav] = useState(product.isFavourite || false);
  const intervalRef = useRef(null);

  const nextImg = () => {
    if (images.length > 1) setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = () => {
    if (images.length > 1)
      setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide
  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(nextImg, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const pauseAutoScroll = () => clearInterval(intervalRef.current);
  const resumeAutoScroll = () =>
    (intervalRef.current = setInterval(nextImg, 3000));

  // Toggle Favourite
  const toggleFavourite = async (e) => {
    e.stopPropagation();
    try {
      const res = await CustomFetch.patch(
        `/product/${product._id}/toggle-favourite`
      );
      setIsFav(res.data.data.isFavourite);
    } catch (err) {
      console.error("Favourite toggle failed:", err);
      alert("Unable to update favourite");
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md 
      transition-all duration-300 cursor-pointer overflow-hidden group"
      onMouseEnter={pauseAutoScroll}
      onMouseLeave={resumeAutoScroll}
    >
      {/* Favourite Icon */}
      <button
        onClick={toggleFavourite}
        className="absolute right-3 top-3 bg-white p-2 rounded-full shadow-md z-20
        hover:scale-110 transition-all"
      >
        <Heart
          className={`w-5 h-5 ${
            isFav ? "text-red-500 fill-red-500" : "text-gray-600"
          }`}
        />
      </button>

      {/* IMAGE CAROUSEL */}
      <div className="w-full h-56 bg-gray-50 relative overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${index * (100 / images.length)}%)`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={product.name}
              className="w-full h-full object-contain flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 
              rounded-full shadow z-20"
            >
              ❮
            </button>

            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 
              rounded-full shadow z-20"
            >
              ❯
            </button>
          </>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">{product.brand}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-semibold">
            {product.ratings} ★
          </span>
          <span className="text-xs text-gray-500">
            {product.reviews?.length || 0} Reviews
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-3">
          <p className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 line-through">
            ₹{Math.round(product.price * 1.25).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



































// // src/components/products/ProductCard.jsx
// import React from "react";
// import { Heart } from "lucide-react";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="bg-white shadow-sm hover:shadow-md border border-gray-400 overflow-hidden transition-all duration-300 cursor-pointer group">
//       {/* Wish Icon */}
//       <button className="absolute right-3 top-3 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
//         <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
//       </button>

//       {/* Image */}
//       <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-full object-contain group-hover:scale-105 transition-all"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">
//           {product.name}
//         </h3>

//         <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
//           {product.brand}
//         </p>

//         {/* Rating */}
//         <div className="flex items-center gap-2 mt-2">
//           <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-bold">
//             {product.rating} ★
//           </span>
//           <span className="text-xs text-gray-500">
//             {product.reviews} Reviews
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mt-2">
//           <p className="text-lg font-bold text-gray-900">
//             ₹{Math.round(product.price * 84)}
//           </p>
//           <p className="text-xs text-gray-500 line-through">
//             ₹{Math.round(product.price * 84 * 1.25)}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
