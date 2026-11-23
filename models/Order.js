import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddCard",
        required: true,
      },
      quentity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    name: "String",
    addressLine: "String",
    city: "String",
    state: "String",
    pincode: "String",
  },
  status: {
    type: String,
    default: "pending",
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model("Order", orderSchema);
export default Order;
