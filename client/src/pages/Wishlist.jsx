import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import iphone from "../assets/iphone.png";
import samsung from "../assets/samsung.png";
import sony from "../assets/sony.png";

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
  ]);

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const moveToCart = (id) => {
    alert("Item moved to cart!");
    removeItem(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf4ff] to-[#f8fbff] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-blue-900 mb-10 tracking-tight">
          My Wishlist ❤️
        </h1>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="
                bg-white p-5 rounded-3xl shadow-md 
                border border-blue-100 
                hover:shadow-[0_12px_30px_rgba(0,100,255,0.12)]
                hover:-translate-y-1 transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="w-full h-48 mb-4 relative">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
                <button className="absolute top-3 right-3 text-red-500">
                  <Heart fill="red" />
                </button>
              </div>

              {/* NAME */}
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400 text-sm">★★★★☆</div>
                <span className="text-xs text-gray-600">
                  ({item.reviews} reviews)
                </span>
              </div>

              {/* PRICE */}
              <p className="text-2xl font-bold text-blue-700 mt-3">
                ₹{item.price.toLocaleString()}
              </p>

              {/* BUTTONS */}
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => moveToCart(item.id)}
                  className="
                    flex items-center gap-2 w-full py-2 rounded-xl
                    bg-blue-600 text-white font-semibold text-sm
                    hover:bg-blue-700 transition
                  "
                >
                  <ShoppingCart size={16} />
                  Move to Cart
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    p-2 rounded-xl bg-red-100 text-red-600
                    hover:bg-red-200 transition
                  "
                >
                  <Trash2 size={20} />
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
