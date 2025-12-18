import express from "express";
import { submitGame } from "../controllers/game.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/submit", protect, submitGame);

export default router;