import express from "express";
const router = express.Router();
import { signUpPost, logInPost } from "../controllers/authController";

router.post("/signup", signUpPost);
router.post("/login", logInPost);

export default router;
