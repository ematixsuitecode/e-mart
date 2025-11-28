// src/subpages/electronics/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";

/**
 * ProductGrid - displays list or empty-state
 * Props:
 *  - products: array
 *  - formatPrice: function(price) -> formatted string
 *  - clearFilters: function
 */
const ProductGrid = ({
  products = [],
  formatPrice = (v) => `₹${Math.round(v * 84)}`,
  clearFilters = () => {},
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-dashed border-gray-300 transition-all duration-500">
        <Search className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-6 text-sm">
          We couldn't find any matches for your selected filters.
        </p>
        <button
          onClick={clearFilters}
          className="bg-blue-600 text-white px-6 py-2 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-md active:scale-95"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard
          key={p.id ?? p._id ?? `${p.name}-${Math.random()}`}
          product={p}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
