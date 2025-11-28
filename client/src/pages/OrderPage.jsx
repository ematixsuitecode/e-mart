import React from "react";
import AddressSection from "../components/order/AddressSection";
import PaymentSection from "../components/order/PaymentSection";
import OrderSummary from "../components/order/OrderSummary";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
    const location = useLocation();
const cartItems = location.state?.cartItems || [];
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-body">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT CONTAINER */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: ADDRESS */}
          <AddressSection />

          {/* STEP 3: PAYMENT */}
          <PaymentSection cartItems={cartItems}/>
        </div>

        {/* RIGHT CONTAINER */}
        <OrderSummary cartItems={cartItems}/>
      </div>
    </div>
  );
};

export default OrderPage;
