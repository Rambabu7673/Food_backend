import mongoose from "mongoose";
import { now } from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  timestamps: {
    type: Date,
    default: now
  }

});

export const User = mongoose.model("User", userSchema);

