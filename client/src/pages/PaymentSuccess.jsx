import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, referenceId, method, gateway } = location.state || {};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 p-6 font-body">

      
      {/* CARD */}
      <div className="bg-white shadow-lg p-8 rounded-2xl max-w-lg w-full border border-gray-200 animate-fadeIn">
        

        {/* SUCCESS ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
            <CheckCircle size={48} />
          </div>
        </div>

        <h1 className="text-3xl font-heading font-bold text-green-600 text-center">
          Payment Successful
        </h1>

        <p className="mt-2 text-gray-700 text-center">
          Your payment has been processed successfully.
        </p>

        {/* DETAILS CARD */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-gray-800 text-sm">
          <p className="flex justify-between">
            <span className="font-semibold">Amount Paid:</span>
            <span className="text-blue-700 font-semibold">
              ₹{amount?.toLocaleString()}
            </span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Method:</span>
            <span className="capitalize">{method}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Gateway:</span>
            <span className="capitalize">{gateway}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Reference ID:</span>
            <span className="text-gray-600">{referenceId}</span>
          </p>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Continue Shopping →
          </button>

          {/* Uncomment when order page ready */}
          {/* <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 border border-blue-600 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition"
          >
            View Orders
          </button> */}
        </div>
      </div>

      {/* Fade-in animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
