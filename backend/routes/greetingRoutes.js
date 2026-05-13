import express from "express";
import { createGreeting, getGreetings } from "../controllers/greetingController.js";

const router = express.Router();

router.get("/", getGreetings);
router.post("/", createGreeting);

export default router;
