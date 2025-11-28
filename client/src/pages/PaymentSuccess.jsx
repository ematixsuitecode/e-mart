import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { amount, referenceId, method, gateway } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 font-body">
      <div className="bg-white shadow-md p-8 rounded-xl max-w-md text-center border border-gray-300">
        <h1 className="text-3xl font-heading font-bold text-green-600">
          Payment Successful ✔
        </h1>

        <p className="mt-3 text-gray-700">
          Your payment has been processed successfully.
        </p>

        <div className="mt-6 text-left space-y-2">
          <p><strong>Amount Paid:</strong> ₹{amount?.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> {method}</p>
          <p><strong>Gateway:</strong> {gateway}</p>
          <p><strong>Reference ID:</strong> {referenceId}</p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
