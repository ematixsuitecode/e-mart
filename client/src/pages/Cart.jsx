// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import {
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  CreditCard,
  Headphones,
  X as XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomFetch from "../utils/CustomFetch";

/* Theme:
   - Neutral slate base
   - Teal accents
*/

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price ?? 0);

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart From Backend
  const fetchCartDetails = async () => {
    try {
      setLoading(true);
      const response = await CustomFetch.get("/cart");
      const cart = response.data || {};
      setCartItems(cart.items || []);
      setSubTotal(cart.subTotal ?? 0);
      setDiscount(cart.discount ?? 0);
      setGrandTotal(cart.grandTotal ?? 0);
    } catch (error) {
      console.error("Error fetching cart", error);
      alert("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  // Local quantity update
  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: qty, totalPrice: qty * (item.price ?? 0) }
          : item
      )
    );

    setTimeout(() => {
      const items = cartItems.map((it) =>
        it._id === id ? { ...it, quantity: qty } : it
      );
      const newSub = items.reduce(
        (acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1),
        0
      );
      setSubTotal(newSub);
      setGrandTotal(Math.max(0, newSub - (discount ?? 0)));
    }, 10);
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    setSelectedItems((prev) => prev.filter((i) => i !== id));

    setTimeout(() => {
      const newSub = cartItems
        .filter((it) => it._id !== id)
        .reduce((acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 1), 0);
      setSubTotal(newSub);
      setGrandTotal(Math.max(0, newSub - (discount ?? 0)));
    }, 10);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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

  // Empty Cart Screen
  if (!loading && (!cartItems || cartItems.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <ShoppingBag className="w-24 h-24 text-teal-600 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 mt-2 text-center max-w-md">
          Browse products and add your favorites to the cart.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-bold shadow transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  /* ---------------- MAIN CART UI ---------------- */

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      {/* HEADER */}
      <div className="w-full bg-slate-800">
        <div className="container mx-auto px-4" style={{ height: 220 }}>
          <div className="h-full flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight font-bold">
              Shopping Cart
            </h1>
            <p className="mt-5 text-sm opacity-90">Home / Shopping Cart</p>
          </div>
        </div>
      </div>

      {/* CARD CONTAINER */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-8">
              {/* HEADER ROW */}
              <div className="hidden md:grid grid-cols-12 bg-yellow-500 rounded-md px-4 py-3 text-sm font-semibold text-slate-700 mb-4">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-3">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* CART ITEMS (SCROLLABLE) */}
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                {cartItems.map((item) => {
                  const img =
                    item?.product?.imageUrl?.[0]?.url ||
                    item?.product?.image ||
                    "https://via.placeholder.com/100";

                  const name = item?.product?.name || "Product";
                  const brand = item?.product?.brand || "";
                  const qty = item.quantity ?? 1;
                  const price = item.price ?? 0;

                  return (
                    <div
                      key={item._id}
                      className="w-full grid grid-cols-12 items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
                    >
                      {/* Checkbox */}
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleSelectItem(item._id)}
                          className="w-5 h-5 accent-teal-600 cursor-pointer"
                        />
                      </div>

                      {/* IMAGE + NAME */}
                      <div className="col-span-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-lg border flex items-center justify-center overflow-hidden">
                          <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-sm md:text-base">
                            {name}
                          </h3>
                          <p className="text-xs text-slate-500">{brand}</p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="col-span-2 text-sm font-medium text-slate-800">
                        {formatPrice(price)}
                      </div>

                      {/* QUANTITY */}
                      <div className="col-span-3 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-2xl overflow-hidden">
                          <button
                            onClick={() => updateQty(item._id, qty - 1)}
                            className="px-3 py-1 hover:bg-slate-100"
                          >
                            <Minus className="w-4 h-4 text-slate-600" />
                          </button>
                          <span className="px-4 text-sm font-semibold">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQty(item._id, qty + 1)}
                            className="px-3 py-1 hover:bg-slate-100"
                          >
                            <Plus className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                      </div>

                      {/* SUBTOTAL + REMOVE */}
                      <div className="col-span-2 text-right">
                        <p className="font-bold text-slate-900">
                          {formatPrice(price * qty)}
                        </p>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="mt-2 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-red-600"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------------- COUPON SECTION (CENTERED) ---------------- */}

              <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200">

                <div
                  className="
      w-full
      flex flex-col md:flex-row
      items-center
      justify-start
      gap-4
    "
                >

                  {/* Text Field - 35% width */}
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="
        w-full md:w-[35%]
        px-5 py-3
        rounded-2xl
        border border-slate-300
        bg-white
        text-slate-700
        focus:outline-none
        focus:ring-0
      "
                  />

                  {/* Gap ~7 between input & button */}
                  <div className="hidden md:block w-7"></div>

                  {/* Apply Button */}
                  <button
                    className="
        px-8 py-3
        bg-teal-600
        text-white
        rounded-full
        font-semibold
        hover:bg-teal-700
        transition
        whitespace-nowrap
      "
                  >
                    Apply Coupon
                  </button>

                  {/* Push clear-cart to the far right */}
                  <div className="flex-1"></div>

                  {/* Clear Shopping Cart */}
                  <button
                    onClick={() => {
                      setCartItems([]);
                      setSelectedItems([]);
                      setSubTotal(0);
                      setDiscount(0);
                      setGrandTotal(0);
                    }}
                    className="
        text-sm
        text-teal-600
        font-semibold
        hover:underline
        whitespace-nowrap
      "
                  >
                    Clear Shopping Cart
                  </button>

                </div>
              </div>



            </div>

            {/* RIGHT SIDE SUMMARY */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                <h4 className="text-lg font-bold text-slate-900 mb-4">
                  Order Summary
                </h4>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subTotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-semibold">Free</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Discount</span>
                    <span className="text-teal-600">
                      - {formatPrice(discount)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-3 flex justify-between text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  disabled={selectedItems.length === 0}
                  onClick={() =>
                    handleCheckout(
                      cartItems.filter((it) => selectedItems.includes(it._id))
                    )
                  }
                  className={`w-full py-3 rounded-2xl font-bold transition ${selectedItems.length
                    ? "bg-teal-600 hover:bg-teal-700 text-white"
                    : "bg-slate-300 text-white cursor-not-allowed"
                    }`}
                >
                  Checkout Selected
                </button>

                <button
                  onClick={() => handleCheckout(cartItems)}
                  className="w-full mt-4 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2"
                >
                  Checkout All <ArrowRight />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Safe & Secure Payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="mt-16 bg-white py-8 border-t border-slate-200">
        <div className="container mx-auto px-4">
          {/* Newsletter */}
          <div className="bg-teal-50 rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-slate-900">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-slate-600 mt-1">
              Get updates on our latest offers
            </p>

            <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full border w-full sm:w-80"
              />
              <button className="px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800">
                Subscribe
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <Truck className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900">Free Shipping</h4>
              <p className="text-sm text-slate-500">Free delivery above ₹500</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <CreditCard className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900">Flexible Payments</h4>
              <p className="text-sm text-slate-500">Secure payment options</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Headphones className="w-8 h-8 text-teal-600" />
              <h4 className="font-bold text-slate-900">24×7 Support</h4>
              <p className="text-sm text-slate-500">We help anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// import React, { useEffect, useState } from "react";
// import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import CustomFetch from "../utils/CustomFetch";

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//   }).format(price);
// };

// const Cart = () => {
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState([]);
//   const [subTotal, setSubTotal] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [grandTotal, setGrandTotal] = useState(0);

//   const [selectedItems, setSelectedItems] = useState([]);

//   const fetchCartDetails = async () => {
//     try {
//       const response = await CustomFetch.get("/cart");
//       const cart = response.data;

//       setCartItems(cart.items);
//       setSubTotal(cart.subTotal);
//       setDiscount(cart.discount);
//       setGrandTotal(cart.grandTotal);
//     } catch (error) {
//       alert("Error fetching cart");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCartDetails();
//   }, []);

//   const updateQty = (id, qty) => {
//     if (qty < 1) return;
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id
//           ? { ...item, quantity: qty, totalPrice: qty * item.price }
//           : item
//       )
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//     setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
//   };

//   const toggleSelectItem = (id) => {
//     setSelectedItems((prev) =>
//       prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
//     );
//   };

//   const handleCheckout = (checkoutItems) => {
//     navigate("/order", {
//       state: {
//         cartItems: checkoutItems,
//         singleProduct: checkoutItems.length === 1,
//         fromSelection: selectedItems.length > 0,
//       },
//     });
//   };

//   // EMPTY CART UI
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//         <img
//           src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
//           alt="Empty Cart"
//           className="w-64 h-64 object-contain mix-blend-multiply"
//         />
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Your Cart is Empty
//         </h2>
//         <p className="text-gray-500 mb-6 text-center">
//           Looks like you haven't added anything to your cart yet.
//         </p>

//         <button
//           onClick={() => navigate("/")}
//           className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition"
//         >
//           Start Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen font-sans pb-20">
//       <div className="container mx-auto px-4 py-8">

//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Shopping Cart ({cartItems.length})
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* CART ITEMS */}
//           <div className="lg:col-span-2 space-y-5">
//             {cartItems.map((item) => (
//               <div
//                 key={item._id}
//                 className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-5"
//               >
//                 {/* SELECT CHECKBOX */}
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item._id)}
//                   onChange={() => toggleSelectItem(item._id)}
//                   className="w-5 h-5 accent-blue-600 cursor-pointer"
//                 />

//                 {/* IMAGE */}
//                 <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center p-2">
//                   <img
//                     src={item.product.imageUrl[0].url}
//                     alt={item.product.name}
//                     className="w-full h-full object-contain mix-blend-multiply"
//                   />
//                 </div>

//                 {/* DETAILS */}
//                 <div className="flex-1 flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
//                         {item.product.name}
//                       </h3>

//                       <button
//                         onClick={() => removeItem(item._id)}
//                         className="text-gray-400 hover:text-red-500 transition"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </div>

//                     <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-bold">
//                       {item.product.brand || "Brand"}
//                     </p>

//                     <div className="mt-2 text-sm text-green-600 font-medium">
//                       In Stock
//                     </div>
//                   </div>

//                   {/* QUANTITY + PRICE */}
//                   <div className="flex justify-between items-end mt-4">
//                     {/* QUANTITY BOX */}
//                     <div className="flex items-center border border-gray-300 rounded-lg">
//                       <button
//                         onClick={() => updateQty(item._id, item.quantity - 1)}
//                         className="p-2 hover:bg-gray-100 text-gray-600 transition"
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>

//                       <span className="w-8 text-center font-bold text-sm">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() => updateQty(item._id, item.quantity + 1)}
//                         className="p-2 hover:bg-gray-100 text-gray-600 transition"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>
//                     </div>

//                     {/* PRICE */}
//                     <div className="text-right">
//                       <span className="block text-xl font-bold text-gray-900">
//                         {formatPrice(item.price * item.quantity)}
//                       </span>

//                       {item.quantity > 1 && (
//                         <span className="text-xs text-gray-500">
//                           {formatPrice(item.price)} each
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* BUY NOW */}
//                   <button
//                     onClick={() =>
//                       handleCheckout([
//                         { ...item, quantity: 1, totalPrice: item.price },
//                       ])
//                     }
//                     className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center gap-2"
//                   >
//                     Buy Now <ArrowRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* RIGHT SIDE: BILL SUMMARY */}
//           <div>
//             <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
//               <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">
//                 Order Summary
//               </h2>

//               <div className="space-y-3 text-sm mb-6">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Subtotal</span>
//                   <span>{formatPrice(subTotal)}</span>
//                 </div>

//                 <div className="flex justify-between text-gray-600">
//                   <span>Shipping</span>
//                   <span className="text-green-600 font-bold">Free</span>
//                 </div>

//                 <div className="flex justify-between text-gray-600">
//                   <span>Discount</span>
//                   <span className="text-green-600">- {formatPrice(discount)}</span>
//                 </div>

//                 <div className="border-t border-dashed border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold text-gray-900">
//                   <span>Total</span>
//                   <span>{formatPrice(grandTotal)}</span>
//                 </div>
//               </div>

//               {/* CHECKOUT SELECTED */}
//               <button
//                 disabled={selectedItems.length === 0}
//                 onClick={() =>
//                   handleCheckout(
//                     cartItems.filter((item) => selectedItems.includes(item._id))
//                   )
//                 }
//                 className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition disabled:bg-gray-400"
//               >
//                 Checkout Selected
//               </button>

//               {/* CHECKOUT ALL */}
//               <button
//                 onClick={() => handleCheckout(cartItems)}
//                 className="w-full mt-4 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg"
//               >
//                 Checkout All <ArrowRight className="w-5 h-5" />
//               </button>

//               <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
//                 <ShieldCheck className="w-4 h-4 text-green-600" />
//                 Safe and Secure Payments
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
