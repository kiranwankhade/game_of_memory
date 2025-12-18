import express  from "express";
import { loginEmail, loginGoogle, signupEmail, signupGoogle } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signupEmail);
router.post("/login",loginEmail);
router.post("/google/signup",signupGoogle);
router.post("/google/login",loginGoogle);

export default router;
