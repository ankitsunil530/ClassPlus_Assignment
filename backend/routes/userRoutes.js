import express from "express";
import { createUser, loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
