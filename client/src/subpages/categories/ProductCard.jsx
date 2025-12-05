// src/subpages/electronics/ProductCard.jsx
import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="bg-white border border-gray-300 rounded-md p-4 hover:shadow-xl transition duration-300 group flex flex-col">
      {/* ❤️ Wishlist Icon */}
      <button className="absolute top-3 right-3 bg-white/80 p-1 rounded-full shadow hover:bg-white">
        <Heart className="w-5 h-5 text-gray-400 hover:text-rose-500" />
      </button>

      {/* CLICKABLE IMAGE */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square mb-3 relative overflow-hidden bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-[1.02] transition">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Brand */}
      <div className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">
        {product.brand}
      </div>

      {/* CLICKABLE TITLE */}
      <Link to={`/products/${product.id}`}>
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
          {product.name}
        </h3>
      </Link>

      {/* Specs */}
      <div className="text-[12px] text-gray-600 mb-3">
        {product.specs?.ram && (
          <div>
            {product.specs.ram} • {product.specs.internal_storage}
          </div>
        )}
        {product.specs?.type && !product.specs?.ram && (
          <div>{product.specs.type}</div>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
          {product.rating} <Star className="w-3 h-3" />
        </span>
        <span className="text-xs text-gray-400">({product.reviews})</span>
      </div>

      {/* PRICE + CART */}
      <div className="mt-auto flex justify-between items-end border-t pt-3">
        <div>
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
          <div className="text-xs text-green-600 font-semibold">
            Free Delivery
          </div>
        </div>

        <button className="bg-indigo-50 text-indigo-600 p-2 rounded-md hover:bg-indigo-600 hover:text-white transition">
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
