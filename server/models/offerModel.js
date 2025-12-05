import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
   productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }
    ],

  offerType: {
    type: String,
    enum: ["99_STORE", "DEAL_OF_DAY", "LUCKY_DRAW"],
    required: true
  },

  // Common fields
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true },

  // For ₹99 Store & Deal of the Day
  specialPrice: Number,
  discountPercent: Number,

  // Lucky Draw
  luckyDrawCode: String,
  maxParticipants: Number,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

}, { timestamps: true });

export default mongoose.model("Offer", OfferSchema);
