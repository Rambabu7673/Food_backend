import mongoose from "mongoose";
const addCardSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemImage: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

export const AddCard = mongoose.model("AddCard", addCardSchema);
export default AddCard;