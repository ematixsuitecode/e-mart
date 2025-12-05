import mongoose from "mongoose";


const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },       // price per unit
  totalPrice: { type: Number, required: true },  // quantity * price
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  mobileNo: { type: String, required: true },
  altNo: { type: String },  // optional

  address: {type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true},   // Single address per order

  items: [OrderItemSchema], // Multiple items

  subTotal: { type: Number, required: true },
  deliveryCharges: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["COD", "UPI", "Card", "NetBanking", "Wallet"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

  expectedDelivery: { type: Date },

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
