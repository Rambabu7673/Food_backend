import express from "express";
import {
  addCard,
  getAllCards,
  updateCard,
  deleteCard,
} from "../controllers/addCardsSection.js";
const router = express.Router();
router.post("/user/addCard", addCard);
router.get("/user/getAllCards", getAllCards);
router.put("/user/updateCard/:id", updateCard);
router.delete("/user/deleteCard/:id", deleteCard);

export default router;
