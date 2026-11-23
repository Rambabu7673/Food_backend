import express from "express";
import {
  addAddress,
  getAllAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressSection.js";
const router = express.Router();
router.post("/user/addAddress", addAddress);
router.get("/user/getAllAddress", getAllAddress);
router.put("/user/updateAddress/:id", updateAddress);
router.delete("/user/deleteAddress/:id", deleteAddress);

export default router;
