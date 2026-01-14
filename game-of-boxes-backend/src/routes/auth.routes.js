import express  from "express";
import { getMe, loginEmail, loginGoogle, signupEmail, signupGoogle } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signupEmail);
router.post("/login",loginEmail);
router.post("/google/signup",signupGoogle);
router.post("/google/login",loginGoogle);
router.get("/me", protect, getMe);

export default router;
