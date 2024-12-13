import express from "express";
const router = express.Router();
import { getAllUsers } from "../controllers/userController";

router.get('/', getAllUsers)

export default router;