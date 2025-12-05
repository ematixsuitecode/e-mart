import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true},
  doorNo: { type: String, required: true },
  street: { type: String, required: true },
  landmark: { type: String },
  addressType: {
    type: String,
    enum: ["Home", "Office", "Other"],
    default: "Home",
  },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  mobileNo: {type: Number, required: true},
  altNo: {type: String},
}, { timestamps: true });

export default mongoose.model('Address', AddressSchema);

