import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomFetch from "../utils/CustomFetch";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [selectedItems, setSelectedItems] = useState([]);

  const fetchCartDetails = async () => {
    try {
      const response = await CustomFetch.get("/cart");
      const cart = response.data;

      setCartItems(cart.items);
      setSubTotal(cart.subTotal);
      setDiscount(cart.discount);
      setGrandTotal(cart.grandTotal);
    } catch (error) {
      alert("Error fetching cart");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: qty, totalPrice: qty * item.price }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleCheckout = (checkoutItems) => {
    navigate("/order", {
      state: {
        cartItems: checkoutItems,
        singleProduct: checkoutItems.length === 1,
        fromSelection: selectedItems.length > 0,
      },
    });
  };

  // EMPTY CART UI
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
          alt="Empty Cart"
          className="w-64 h-64 object-contain mix-blend-multiply"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-6 text-center">
          Looks like you haven't added anything to your cart yet.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Shopping Cart ({cartItems.length})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5"
              >
                {/* SELECT CHECKBOX */}
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleSelectItem(item._id)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />

                {/* IMAGE */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                  <img
                    src={item.product.imageUrl[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                        {item.product.name}
                      </h3>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-bold">
                      {item.product.brand || "Brand"}
                    </p>

                    <div className="mt-2 text-sm text-green-600 font-medium">
                      In Stock
                    </div>
                  </div>

                  {/* QUANTITY + PRICE */}
                  <div className="flex justify-between items-end mt-4">
                    {/* QUANTITY BOX */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQty(item._id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 text-gray-600 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="w-8 text-center font-bold text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQty(item._id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 text-gray-600 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="text-right">
                      <span className="block text-xl font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      {item.quantity > 1 && (
                        <span className="text-xs text-gray-500">
                          {formatPrice(item.price)} each
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BUY NOW */}
                  <button
                    onClick={() =>
                      handleCheckout([
                        { ...item, quantity: 1, totalPrice: item.price },
                      ])
                    }
                    className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center gap-2"
                  >
                    Buy Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: BILL SUMMARY */}
          <div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subTotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="text-green-600">- {formatPrice(discount)}</span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* CHECKOUT SELECTED */}
              <button
                disabled={selectedItems.length === 0}
                onClick={() =>
                  handleCheckout(
                    cartItems.filter((item) => selectedItems.includes(item._id))
                  )
                }
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400"
              >
                Checkout Selected
              </button>

              {/* CHECKOUT ALL */}
              <button
                onClick={() => handleCheckout(cartItems)}
                className="w-full mt-4 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg"
              >
                Checkout All <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Safe and Secure Payments
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
