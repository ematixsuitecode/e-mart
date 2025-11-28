const OrderSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = 500;
  const delivery = 0;
  const total = subtotal - discount + delivery;

  return (
    <div className="bg-white p-5 border border-gray-300 h-fit">
      
      <h2 className="text-xl font-heading font-bold mb-4 text-gray-800">
        Order Summary
      </h2>

      {/* ITEMS LIST */}
      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-3"
          >
            <img
              src={item.image}
              className="w-16 h-16 object-cover flex-shrink-0"
            />

            <div className="flex-1">
              <h3 className="font-heading text-gray-900 text-sm">{item.name}</h3>
              <p className="text-xs text-gray-600">{item.specs}</p>
              <p className="font-heading text-blue-700 text-sm">
                ₹{item.price.toLocaleString()}
              </p>
            </div>

            <span className="font-body text-gray-700 text-sm">
              Qty: {item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* PRICE SUMMARY */}
      <div className="space-y-3 font-body text-gray-700 mt-5">

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">− ₹{discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="text-blue-600">Free</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-heading font-bold text-gray-900">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
