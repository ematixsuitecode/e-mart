import React, { useEffect, useState } from "react";

export default function PaymentSection({ cartItems, onPaymentSelect }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [method, setMethod] = useState("upi");

  useEffect(() => {
    onPaymentSelect({ method });
  }, [method]);

  return (
    <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">2. Payment Method</h2>

      <div className="space-y-3">

        {/* UPI */}
        <label
          className={`p-4 border rounded-xl cursor-pointer ${
            method === "upi" ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          <span className="ml-3 font-semibold">UPI Payment</span>
        </label>

        {/* CARD */}
        <label
          className={`p-4 border rounded-xl cursor-pointer ${
            method === "card" ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          <span className="ml-3 font-semibold">Credit / Debit Card</span>
        </label>

        {/* COD */}
        <label
          className={`p-4 border rounded-xl cursor-pointer ${
            method === "COD" ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={method === "COD"}
            onChange={() => setMethod("COD")}
          />
          <span className="ml-3 font-semibold">Cash On Delivery</span>
        </label>

      </div>
    </div>
  );
}









// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import gpay from '../../assets/gpay.png'
// import bharat from '../../assets/bharat.png'
// import paytm from '../../assets/Paytm_Logo.png'
// import phone from '../../assets/phonepe.png'

// // CARD BRAND DETECTION
// const detectCardBrand = (number) => {
//   if (/^4/.test(number)) return "Visa";
//   if (/^5[1-5]/.test(number)) return "Mastercard";
//   if (/^3[47]/.test(number)) return "American Express";
//   if (/^6/.test(number)) return "RuPay";
//   return "Card";
// };

// const PaymentSection = ({ cartItems }) => {
//   // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const discount = 500;
//   const delivery = 0;
//   const total = subtotal - discount + delivery;

//   const navigate = useNavigate();
//   const [method, setMethod] = useState("upi");
//   const [gateway, setGateway] = useState("gpay");
//   const [upiId, setUpiId] = useState("");

//   // CARD STATES
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardName, setCardName] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");

//   const brand = detectCardBrand(cardNumber.replace(/\s/g, ""));

//   // QR LOADER DELAY
//   const [showQR, setShowQR] = useState(false);

//   useEffect(() => {
//     // only show QR after 2 sec delay when UPI app selected
//     if (["gpay", "phonepe", "paytm", "bhim"].includes(gateway)) {
//       setShowQR(false);
//       const timer = setTimeout(() => setShowQR(true), 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [gateway]);

//   // FORMAT CARD NUMBER #### #### #### ####
//   const formatCardNumber = (value) => {
//     return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
//   };

//   // FORMAT EXPIRY
//   const formatExpiry = (value) => {
//     const cleaned = value.replace(/\D/g, "");
//     if (cleaned.length >= 3)
//       return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
//     return cleaned;
//   };

//   // PAYMENT HANDLER
//   const handlePayment = () => {
//     const refId = "PAY" + Math.floor(Math.random() * 1000000000);

//     navigate("/payment-success", {
//       state: {
//         amount: total,
//         referenceId: refId,
//         method,
//         gateway: method === "card" ? brand : gateway,
//       },
//     });
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-sm">
//       <h2 className="text-xl font-heading font-bold mb-4 text-gray-800">
//         2. Payment Method
//       </h2>

//       <div className="space-y-6">

//         {/* ======================== UPI PAYMENT ======================== */}
//         <label
//           className={`p-4 border rounded-xl cursor-pointer flex gap-3
//           ${method === "upi" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
//         >
//           <input
//             type="radio"
//             name="payment"
//             checked={method === "upi"}
//             onChange={() => setMethod("upi")}
//           />
//           <h3 className="font-heading font-semibold">UPI (Razorpay)</h3>
//         </label>

//         {method === "upi" && (
//           <div className="p-5 border border-gray-300 rounded-xl bg-gray-50 ml-6">

//             {/* GRID */}
//             <p className="text-sm font-semibold text-gray-700 mb-2">Select UPI App</p>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 { id: "gpay", logo: gpay, name: "GPay" },
//                 { id: "phonepe", logo: phone, name: "PhonePe" },
//                 { id: "paytm", logo: paytm, name: "Paytm" },
//                 { id: "bhim", logo: bharat, name: "BHIM UPI" },
//               ].map((app) => (
//                 <div
//                   key={app.id}
//                   className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center w-28
//                   ${gateway === app.id ? "border-blue-600 bg-blue-100" : "border-gray-300"}`}
//                   onClick={() => setGateway(app.id)}
//                 >
//                   <img src={app.logo} className="w-10 h-10" />
//                   <span className="text-xs font-medium">{app.name}</span>
//                 </div>
//               ))}
//             </div>

//             {/* QR or Loader */}
//             {["gpay", "phonepe", "paytm", "bhim"].includes(gateway) && (
//               <div className="mt-6 text-center">

//                 {!showQR ? (
//                   <div className="flex flex-col items-center py-6">
//                     <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//                     <p className="text-xs text-gray-500 mt-2">Loading QR...</p>
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-sm font-semibold text-gray-700 mb-2">
//                       Scan & Pay
//                     </p>

//                     <img
//                       src="https://api.qrserver.com/v1/create-qr-CODe/?size=180x180&data=upi://pay?pn=Ecommerce"
//                       alt="QR"
//                       className="mx-auto rounded-lg shadow"
//                     />

//                     <button
//                       onClick={handlePayment}
//                       className="mt-4 w-full py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
//                     >
//                       Payment Successful →
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Divider */}
//             <div className="my-4 flex items-center gap-3">
//               <div className="flex-1 h-[1px] bg-gray-300"></div>
//               <span className="text-xs text-gray-600">OR</span>
//               <div className="flex-1 h-[1px] bg-gray-300"></div>
//             </div>

//             {/* UPI ID */}
//             <label className="text-sm font-medium">Enter UPI ID</label>
//             <input
//               type="text"
//               placeholder="example@upi"
//               className="mt-1 w-full p-2 border border-gray-300 rounded-md"
//               value={upiId}
//               onChange={(e) => {
//                 setUpiId(e.target.value);
//                 setGateway("upiid");
//                 setShowQR(false);
//               }}
//             />
//           </div>
//         )}

//         {/* ======================== CARD PAYMENT ======================== */}
//         <label
//           className={`p-4 border rounded-xl cursor-pointer flex gap-3
//           ${method === "card" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
//         >
//           <input
//             type="radio"
//             name="payment"
//             checked={method === "card"}
//             onChange={() => setMethod("card")}
//           />
//           <h3 className="font-heading font-semibold">Credit / Debit Card</h3>
//         </label>

//         {method === "card" && (
//           <div className="mt-3 p-6 bg-gray-50 rounded-xl border border-gray-300 ml-6 space-y-5 w-[90%]">

//             {/* Card Preview */}
//             <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-5 rounded-xl text-white shadow h-40 flex flex-col justify-between">
//               <div className="flex justify-between text-sm">
//                 <span>{brand}</span>
//                 <span>•••• {cardNumber.slice(-4) || "0000"}</span>
//               </div>

//               <div className="text-xl tracking-widest">
//                 {cardNumber || "•••• •••• •••• ••••"}
//               </div>

//               <div className="flex justify-between text-sm pt-3">
//                 <span>{cardName || "CARD HOLDER"}</span>
//                 <span>{expiry || "MM/YY"}</span>
//               </div>
//             </div>

//             {/* Card Number */}
//             <input
//               type="text"
//               maxLength={19}
//               placeholder="Card Number"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
//             />

//             {/* Name */}
//             <input
//               type="text"
//               placeholder="Name on Card"
//               className="w-full p-3 border border-gray-300"
//               value={cardName}
//               onChange={(e) => setCardName(e.target.value)}
//             />

//             {/* Expiry + CVV */}
//             <div className="flex gap-3">
//               <input
//                 type="text"
//                 maxLength={5}
//                 placeholder="MM/YY"
//                 className="w-1/2 p-3 border border-gray-300"
//                 value={expiry}
//                 onChange={(e) => setExpiry(formatExpiry(e.target.value))}
//               />

//               <input
//                 type="password"
//                 maxLength={3}
//                 placeholder="CVV"
//                 className="w-1/2 p-3 border border-gray-300 "
//                 value={cvv}
//                 onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
//               />
//             </div>

//             {/* Pay Button */}
//             <button
//               onClick={handlePayment}
//               className="w-full py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//             >
//               Pay ₹{subtotal.toLocaleString()}
//             </button>
//           </div>
//         )}

//         {/* ======================== COD ======================== */}
//         <label
//           className={`p-4 border cursor-pointer flex gap-3 
//           ${method === "COD" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
//         >
//           <input
//             type="radio"
//             name="payment"
//             checked={method === "COD"}
//             onChange={() => setMethod("COD")}
//           />
//           <h3 className="font-heading font-semibold">Cash On Delivery (COD)</h3>
//         </label>

//         {method === "COD" && (
//           <button
//             onClick={handlePayment}
//             className="w-full mt-3 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
//           >
//             Confirm COD Order →
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentSection;
