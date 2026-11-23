import express from "express";
import { userRegister, loginUser } from "../controllers/user.js";
const router = express.Router();
router.post("/user/register", userRegister);
router.post("/user/login", loginUser);

export default router;
