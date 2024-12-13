import express from "express";
const router = express.Router();
import { signUpPost, logInPost } from "../controllers/authController";
import { verifyToken } from "../passport/jwt"

router.post("/signup", signUpPost);
router.post("/login", logInPost);

export default router;
