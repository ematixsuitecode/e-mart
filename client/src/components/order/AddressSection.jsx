import React, { useState } from "react";
import { Plus, CheckCircle } from "lucide-react";

const AddressSection = () => {
  const [selected, setSelected] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    phone: "",
  });

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-300 shadow-sm">
      <h2 className="text-xl font-heading font-bold mb-5 text-gray-800">
        1. Delivery Address
      </h2>

      {/* ADDRESS LIST */}
      <div className="space-y-4">
        {/* Address 1 */}
        <div
          className={`relative p-5 rounded-xl border cursor-pointer transition-all 
           ${selected === 1 ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-300"}
          `}
          onClick={() => setSelected(1)}
        >
          {selected === 1 && (
            <CheckCircle className="absolute top-4 right-4 text-blue-600" size={22} />
          )}

          <h3 className="font-heading text-gray-900 font-semibold">Praveen Kumar</h3>
          <p className="text-gray-700 text-sm leading-tight">
            23, Gandhi Nagar, Coimbatore, Tamil Nadu – 641002
          </p>
          <p className="text-gray-700 text-sm">Phone: 9876543210</p>
        </div>

        {/* Address 2 */}
        <div
          className={`relative p-5 rounded-xl border cursor-pointer transition-all 
          ${selected === 2 ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-300"}
          `}
          onClick={() => setSelected(2)}
        >
          {selected === 2 && (
            <CheckCircle className="absolute top-4 right-4 text-blue-600" size={22} />
          )}

          <h3 className="font-heading text-gray-900 font-semibold">Office Address</h3>
          <p className="text-gray-700 text-sm leading-tight">
            Tidel Park, Peelamedu, Coimbatore – 641004
          </p>
          <p className="text-gray-700 text-sm">Phone: 9003456789</p>
        </div>
      </div>

      {/* ADD NEW ADDRESS BUTTON */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-5 w-full flex items-center justify-center gap-2 p-3 border border-blue-600 
        text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition"
      >
        <Plus size={18} /> Add New Address
      </button>

      {/* ADD NEW ADDRESS FORM */}
      {showForm && (
        <div className="mt-5 p-4 border border-gray-300 rounded-xl bg-gray-50 animate-fadeIn">
          <h3 className="font-heading text-gray-900 font-semibold mb-3">
            Add a New Address
          </h3>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
            />

            <textarea
              placeholder="Address"
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress({ ...newAddress, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />

            <button
              onClick={() => {
                alert("Address saved! (You can integrate backend next)");
                setShowForm(false);
              }}
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSection;
