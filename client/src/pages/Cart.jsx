import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import samsungImg from "../assets/samsung.jpg"
import realme from "../assets/realme.png"
import headPhone from "../assets/HeadPhones.jpeg"

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Samsung Galaxy A54",
      specs: "8 GB RAM • Super AMOLED • 256 GB Storage",
      price: 37716,
      qty: 1,
      image:samsungImg
    },
    {
      id: 2,
      name: "Realme GT 2 Pro",
      specs: "12 GB RAM • 2K AMOLED • Snapdragon 8 Gen 1",
      price: 50316,
      qty: 1,
      image:realme
        },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      specs: "Wireless • ANC • 30hr Battery",
      price: 29232,
      qty: 1,
      image:headPhone
    },
  ]);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = 500;
  const shipping = 0;
  const total = subtotal - discount + shipping;

 return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#dcebff] via-[#f3f8ff] to-[#ffffff] py-12 px-4 md:px-10">

    {/* Title */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 tracking-tight mb-14">
      Your Shopping Cart
    </h1>

    {/* 3-column → now reduced width layout */}
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

      {/* LEFT — CART ITEMS (compact width) */}
      <div className="lg:col-span-2 space-y-7">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="
              group flex gap-5 
              p-5 rounded-2xl 
              bg-white shadow-[0_6px_18px_rgba(0,0,0,0.07)]
              border border-blue-100/50
              hover:shadow-[0_12px_30px_rgba(0,115,255,0.18)]
              transition-all duration-400
              hover:-translate-y-1
            "
          >
            {/* IMAGE */}
            <div className="w-28 h-28 flex-shrink-0 relative">
              <img
                src={item.image}
                className="w-full h-full object-cover rounded-xl shadow-md"
                alt=""
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.specs}</p>

              {/* RATING + REVIEWS */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400 text-sm">
                  ★★★★☆
                </div>
                <span className="text-xs text-gray-600">(1,284 reviews)</span>
              </div>

              {/* SHORT DESCRIPTION */}
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                This model delivers excellent performance with premium features,
                long battery life, and boosted display quality making it ideal
                for all-day usage.
              </p>

              {/* PRICE + QUANTITY */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-blue-700">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="flex items-center gap-4 px-4 py-1.5 bg-gray-100 rounded-full border border-gray-300">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="text-blue-700 text-lg font-bold"
                  >
                    −
                  </button>

                  <span className="font-semibold text-gray-900">
                    {item.qty}
                  </span>

                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="text-blue-700 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={22} />
            </button>
          </div>
        ))}
      </div>

      {/* BILLING SECTION */}
      <div
        className="
          bg-white p-8 rounded-3xl 
          border border-blue-100 shadow-[0_6px_20px_rgba(0,0,0,0.10)]
        "
      >
        <h3 className="text-3xl font-bold text-blue-900 mb-7">Bill Summary</h3>

        <div className="space-y-4 text-gray-700 text-lg">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">− ₹{discount}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-blue-700">Free</span>
          </div>

          <hr className="my-5 border-gray-300" />

          <div className="flex justify-between text-3xl font-extrabold text-blue-800">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button
          className="
            w-full mt-8 py-4 text-xl font-semibold text-white 
            rounded-xl
            bg-gradient-to-r from-blue-700 to-blue-500
            hover:from-blue-600 hover:to-blue-400
            transition-all duration-300
          "
        >
          Checkout →
        </button>
      </div>
    </div>
  </div>
);


};

export default Cart;
