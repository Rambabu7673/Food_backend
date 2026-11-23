import express from "express";

const router = express.Router();

import {
  createOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";

router.post("/user/createOrder", createOrder);

router.get("/user/getOrders/:userId", getOrdersByUserId);

router.put("/user/updateOrder/:orderId", updateOrder);

router.delete("/user/deleteOrder/:userId", deleteOrder);

export default router;
