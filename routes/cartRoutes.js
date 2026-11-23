import express from "express";
import {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  getCartByUserId,
} from "../controllers/cart.js";
const router = express.Router();
router.post("/user/addCart", addToCart);
router.put("/user/updateCart/:id", updateCartItemQuantity );
router.delete("/user/deleteCart/:id", removeFromCart);
router.get("/user/getCart/:userId", getCartByUserId);

export default router;
