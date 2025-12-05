import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart, Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import CustomFetch from "../utils/CustomFetch";

// Format Price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const Wishlist = () => {
  const [favList, setFavList] = useState([]);

  // Fetch favourite products
  const fetchFavourite = async () => {
    try {
      const favourite = await CustomFetch.get("/product");
      const allProducts = favourite.data.data;

      const favOnly = allProducts.filter((p) => p.isFavourite === true);
      setFavList(favOnly);

    } catch (err) {
      console.error("Failed to fetch favourites:", err);
    }
  };

  useEffect(() => {
    fetchFavourite();
  }, []);

  // Remove item
  const removeItem = async (_id) => {
    setFavList((prev) => prev.filter((item) => item._id !== _id));
  };

  const moveToCart = (_id) => {
    alert("Item moved to cart!");
    removeItem(_id);
  };

  // EMPTY STATE UI
  if (favList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-red-500 fill-current" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save items you love to buy later.</p>

        <Link
          to="/"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          My Wishlist ({favList.length})
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {favList.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-lg transition relative flex flex-col group"
            >

              {/* Remove button */}
              <button
                onClick={() => removeItem(item._id)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition shadow-sm border border-gray-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* IMAGE */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-50 p-4">
                <img
                  src={item.imageUrl?.[0]?.url}
                  alt={item.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1 flex flex-col">

                {/* BRAND + NAME */}
                <div className="mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {item.brand || "Brand"}
                  </span>

                  <p className="block text-sm font-bold text-gray-900 leading-snug hover:text-blue-600 transition line-clamp-2 mb-1">
                    {item.name}
                  </p>
                </div>

                {/* RATING */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(item.rating || 4) ? "fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs text-gray-400">
                    ({item.reviews?.length || 0})
                  </span>
                </div>

                {/* PRICE + ADD TO CART */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">

                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>

                    {item.price > 500 && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(item.price * 1.15)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => moveToCart(item._id)}
                    className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition active:scale-95 shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>

                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Wishlist;
