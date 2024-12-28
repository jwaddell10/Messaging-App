import express from "express";
const router = express.Router();
import { getMessages, postMessage } from "../controllers/messageController";
import { extractBearerToken } from "../passport/jwt";

router.get("/:receiverId/:senderId", getMessages);
router.post("/:id", extractBearerToken, postMessage);

export default router;
