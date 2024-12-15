import express from "express";
const router = express.Router();
import { extractBearerToken, validateJWTAndGetUser } from "../passport/jwt";
import { getAllUsers, getSingleUser, updateUserProfile } from "../controllers/userController";

router.get('/', getAllUsers)
router.get("/:id", getSingleUser)

router.put("/:id", extractBearerToken, updateUserProfile)

export default router;