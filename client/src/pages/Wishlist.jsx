import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import iphone from "../assets/iphone.png";
import samsung from "../assets/samsung.png";
import sony from "../assets/sony.png";

import audio from "../assets/audio.png";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Apple iPhone 14 Pro",
      image: iphone,
      price: 112900,
      rating: 4.8,
      reviews: "24,721",
      description:
        "A16 Bionic • 48MP Pro Camera • Dynamic Island • Always-On display",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      image: samsung,
      price: 124999,
      rating: 4.7,
      reviews: "18,342",
      description:
        "200MP camera • Snapdragon 8 Gen 2 • 5000 mAh battery • S-Pen included",
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      image: sony,
      price: 29990,
      rating: 4.6,
      reviews: "9,503",
      description:
        "Industry-leading ANC • 30hr battery • Crystal-clear microphone quality",
    },
    {
      id: 4,
      name: "OnePlus Buds Pro 2",
      image: audio,
      price: 11999,
      rating: 4.5,
      reviews: "12,118",
      description:
        "Smart Adaptive Noise Cancellation • Dual Drivers • Spatial Audio • Up to 39hrs playback",
    },
  ]);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    alert("Item moved to cart!");
    removeItem(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf4ff] to-[#f8fbff] p-6 font-body">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-10 tracking-tight font-heading">
          My Wishlist
        </h1>

        {/* Wishlist Grid - 4 Cards Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="
                bg-white p-4 shadow-sm
                border border-gray-300 
                hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                hover:-translate-y-1 transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div
                className="
                  w-full h-36 mb-3 flex items-center justify-center relative 
                  border border-gray-300 
                "
              >
                <img
                  src={item.image}
                  alt=""
                  className="object-contain h-full w-auto p-1"
                />

                <button className="absolute top-2 right-2 text-red-500">
                  <Heart fill="red" size={18} />
                </button>
              </div>

              {/* NAME */}
              <h2 className="text-base font-semibold text-gray-900 font-heading">
                {item.name}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-xs mt-1 leading-snug font-body">
                {item.description}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                <span className="text-xs text-gray-600">
                  ({item.reviews} reviews)
                </span>
              </div>

              {/* PRICE */}
              <p className="text-xl font-bold text-blue-700 mt-2 font-heading">
                ₹{item.price.toLocaleString()}
              </p>

              {/* BUTTONS */}
              <div className="flex items-center gap-25 mt-4">
                <button
                  onClick={() => moveToCart(item.id)}
                  className="
                    flex items-center justify-center gap-2 w-32 py-2
                    bg-blue-600 text-white font-semibold text-xs font-body
                    hover:bg-blue-700 transition
                  "
                >
                  <ShoppingCart size={15} />
                  Move to Cart
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    p-2 bg-red-100 text-red-600
                    hover:bg-red-200 transition
                  "
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
