import express from "express"
const router = express.Router()
import { getMessages } from "../controllers/messageController";

router.get("/:id", getMessages);

export default router;