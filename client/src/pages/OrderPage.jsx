import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressSection from "../components/order/AddressSection";
import PaymentSection from "../components/order/PaymentSection";
import OrderSummary from "../components/order/OrderSummary";
import CustomFetch from "../utils/CustomFetch";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    if (!paymentDetails) {
      alert("Please choose a payment method");
      return;
    }

    try {
      const res = await CustomFetch.post("/order", {
        mobileNo: selectedAddress.mobileNo,
        address: selectedAddress,
        paymentMethod: paymentDetails.method,
        items: cartItems,
      });

      navigate("/payment-success", { state: { order: res.data.order } });
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <AddressSection onSelect={setSelectedAddress} />
          <PaymentSection 
            cartItems={cartItems}
            onPaymentSelect={setPaymentDetails}
          />
        </div>

        <div className="space-y-4">
          <OrderSummary cartItems={cartItems} />

          <button
            onClick={placeOrder}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            Place Order →
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;










// import React from "react";
// import AddressSection from "../components/order/AddressSection";
// import PaymentSection from "../components/order/PaymentSection";
// import OrderSummary from "../components/order/OrderSummary";
// import { useLocation } from "react-router-dom";

// const OrderPage = () => {
//     const location = useLocation();
// const cartItems = location.state?.cartItems || [];
// console.log('cartItems', cartItems);
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 font-body">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* LEFT CONTAINER */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* STEP 1: ADDRESS */}
//           <AddressSection />

//           {/* STEP 3: PAYMENT */}
//           <PaymentSection cartItems={cartItems}/>
//         </div>

//         {/* RIGHT CONTAINER */}
//         <OrderSummary cartItems={cartItems}/>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;
