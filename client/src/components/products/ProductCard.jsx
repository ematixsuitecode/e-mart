// src/components/products/ProductCard.jsx
import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-sm hover:shadow-md border border-gray-400 overflow-hidden transition-all duration-300 cursor-pointer group">
      {/* Wish Icon */}
      <button className="absolute right-3 top-3 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
      </button>

      {/* Image */}
      <div className="w-full h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-all"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
          {product.brand}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-md font-bold">
            {product.rating} ★
          </span>
          <span className="text-xs text-gray-500">
            {product.reviews} Reviews
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <p className="text-lg font-bold text-gray-900">
            ₹{Math.round(product.price * 84)}
          </p>
          <p className="text-xs text-gray-500 line-through">
            ₹{Math.round(product.price * 84 * 1.25)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
