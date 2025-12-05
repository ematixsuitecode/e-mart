import React, { useEffect, useState } from "react";
import { Plus, CheckCircle } from "lucide-react";
import CustomFetch from "../../utils/CustomFetch";

export default function AddressSection({ onSelect }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    doorNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    mobileNo: "",
    addressType: "Home",
    altNo: '',
  });

  // Fetch saved addresses
  const fetchAddresses = async () => {
    try {
      const res = await CustomFetch.get("/address");
      setAddresses(res.data || []);
    } catch (error) {
      console.log("Failed to fetch addresses", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSaveAddress = async () => {
    try {
      const res = await CustomFetch.post("/address", newAddress);
      setAddresses([...addresses, res.data.address]);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAddress = (addr) => {
    setSelectedId(addr._id);
    onSelect(addr);
  };

  return (
    <div className="bg-white p-6 border border-gray-300 shadow-sm rounded-lg">
      <h2 className="text-xl font-bold mb-5 text-gray-800">
        1. Delivery Address
      </h2>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            onClick={() => handleSelectAddress(addr)}
            className={`relative p-5 border rounded-lg cursor-pointer ${
              selectedId === addr._id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            {selectedId === addr._id && (
              <CheckCircle className="absolute top-4 right-4 text-blue-600" />
            )}

            <h3 className="font-semibold text-gray-900 capitalize">
              {addr.addressType}
            </h3>
            <p className="text-gray-700 text-sm">
              {addr.doorNo}, {addr.street}
            </p>
            <p className="text-gray-700 text-sm">{addr.landmark}</p>
            <p className="text-gray-700 text-sm">
              {addr.city}, {addr.state} – {addr.pinCode}
            </p>
            <p className="text-gray-700 text-sm font-medium">
              Phone: {addr.mobileNo}
            </p>
            <p className="text-gray-700 text-sm font-medium">
              Phone: {addr.altNo}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-5 w-full p-3 flex items-center justify-center gap-2 border border-blue-600 
        text-blue-700 font-semibold hover:bg-blue-50 transition rounded-lg"
      >
        <Plus size={18} /> Add New Address
      </button>

      {showForm && (
        <div className="mt-5 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-3">Add New Address</h3>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Door No"
              className="p-2 border border-gray-300 rounded"
              value={newAddress.doorNo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, doorNo: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Street"
              className="p-2 border border-gray-300 rounded"
              value={newAddress.street}
              onChange={(e) =>
                setNewAddress({ ...newAddress, street: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Landmark"
              className="p-2 border border-gray-300 rounded col-span-2"
              value={newAddress.landmark}
              onChange={(e) =>
                setNewAddress({ ...newAddress, landmark: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="City"
              className="p-2 border border-gray-300 rounded"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="State"
              className="p-2 border border-gray-300 rounded"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Pincode"
              className="p-2 border border-gray-300 rounded"
              value={newAddress.pinCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pinCode: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Mobile Number"
              className="p-2 border border-gray-300 rounded col-span-2"
              value={newAddress.mobileNo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobileNo: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Alternate Mobile Number"
              className="p-2 border border-gray-300 rounded "
              value={newAddress.altNo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, altNo: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="p-2 border border-gray-300 rounded "
              value={newAddress.mobileNo}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobileNo: e.target.value })
              }
            />

            <select
              className="p-2 border border-gray-300 rounded col-span-2"
              value={newAddress.addressType}
              onChange={(e) =>
                setNewAddress({
                  ...newAddress,
                  addressType: e.target.value,
                })
              }
            >
              <option>Home</option>
              <option>Office</option>
              <option>Other</option>
            </select>
          </div>

          <button
            onClick={handleSaveAddress}
            className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Save Address
          </button>
        </div>
      )}
    </div>
  );
}


















// import React, { useState } from "react";
// import { Plus, CheckCircle } from "lucide-react";

// const AddressSection = () => {
//   const [selected, setSelected] = useState(1);
//   const [showForm, setShowForm] = useState(false);

//   const [newAddress, setNewAddress] = useState({
//     name: "",
//     address: "",
//     phone: "",
//   });

//   return (
//     <div className="bg-white p-6 border border-gray-300 shadow-sm">
//       <h2 className="text-xl font-heading font-bold mb-5 text-gray-800">
//         1. Delivery Address
//       </h2>

//       {/* ADDRESS LIST */}
//       <div className="space-y-4">
//         {/* Address 1 */}
//         <div
//           className={`relative p-5 border cursor-pointer transition-all 
//            ${selected === 1 ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-300"}
//           `}
//           onClick={() => setSelected(1)}
//         >
//           {selected === 1 && (
//             <CheckCircle className="absolute top-4 right-4 text-blue-600" size={22} />
//           )}

//           <h3 className="font-heading text-gray-900 font-semibold">Praveen Kumar</h3>
//           <p className="text-gray-700 text-sm leading-tight">
//             23, Gandhi Nagar, Coimbatore, Tamil Nadu – 641002
//           </p>
//           <p className="text-gray-700 text-sm">Phone: 9876543210</p>
//         </div>

//         {/* Address 2 */}
//         <div
//           className={`relative p-5 border cursor-pointer transition-all 
//           ${selected === 2 ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-300"}
//           `}
//           onClick={() => setSelected(2)}
//         >
//           {selected === 2 && (
//             <CheckCircle className="absolute top-4 right-4 text-blue-600" size={22} />
//           )}

//           <h3 className="font-heading text-gray-900 font-semibold">Office Address</h3>
//           <p className="text-gray-700 text-sm leading-tight">
//             Tidel Park, Peelamedu, Coimbatore – 641004
//           </p>
//           <p className="text-gray-700 text-sm">Phone: 9003456789</p>
//         </div>
//       </div>

//       {/* ADD NEW ADDRESS BUTTON */}
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="mt-5 w-full flex items-center justify-center gap-2 p-3 border border-blue-600 
//         text-blue-700 font-semibold hover:bg-blue-50 transition"
//       >
//         <Plus size={18} /> Add New Address
//       </button>

//       {/* ADD NEW ADDRESS FORM */}
//       {showForm && (
//         <div className="mt-5 p-4 border border-gray-300 bg-gray-50 animate-fadeIn">
//           <h3 className="font-heading text-gray-900 font-semibold mb-3">
//             Add a New Address
//           </h3>

//           <div className="space-y-3">
//             <input
//               type="text"
//               placeholder="Full Name"
//               className="w-full p-2 border border-gray-300 text-sm"
//               value={newAddress.name}
//               onChange={(e) =>
//                 setNewAddress({ ...newAddress, name: e.target.value })
//               }
//             />

//             <textarea
//               placeholder="Address"
//               rows={3}
//               className="w-full p-2 border border-gray-300 text-sm"
//               value={newAddress.address}
//               onChange={(e) =>
//                 setNewAddress({ ...newAddress, address: e.target.value })
//               }
//             />

//             <input
//               type="text"
//               placeholder="Phone Number"
//               className="w-full p-2 border border-gray-300 text-sm"
//               value={newAddress.phone}
//               onChange={(e) =>
//                 setNewAddress({ ...newAddress, phone: e.target.value })
//               }
//             />

//             <button
//               onClick={() => {
//                 alert("Address saved! (You can integrate backend next)");
//                 setShowForm(false);
//               }}
//               className="w-full p-3 bg-blue-600 text-white font-semibold hover:bg-blue-700"
//             >
//               Save Address
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressSection;
