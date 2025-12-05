import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
      discountPrice: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
    variants: [
      {
        color: String,
        size: String,
        stock: Number,
      },
    ],

  // imageUrl: {
  //   type: [String],
  //   validate: {
  //     validator: function (v) {
  //       return v.length <= 4;
  //     },
  //     message: "You can upload a maximum of 4 images",
  //   },
  //   required: true,
  // },
  imageUrl: [
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  }
],

  tags: { type: [String] }, // Keywords for SEO
  ratings: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      rating: { type: Number },
      date: { type: Date, default: Date.now },
    },
  ],
  slug: { type: String, required: true, unique: true },
  status: { type: String, default: "in stock" },
  weight: { type: String },
  SKU: { type: String, unique: true },
   isFavourite: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
});

export default mongoose.model("Product", productSchema);
