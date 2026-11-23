import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  pincode: {
    type: String,
    required: true,
  },

  timestamps: {
    type: Date,
    default: Date.now,
  },
});

export const Address = mongoose.model("orderAddress", addressSchema);

export default Address; 