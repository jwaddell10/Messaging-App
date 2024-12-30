import expressAsyncHandler from "express-async-handler";
import db from "../db/queries";
import { validateJWTAndGetUser } from "../passport/jwt";

interface SentMessage {
	id: number;
	createdAt: Date;
	receiverId: number;
}

interface ReceivedMessage {
	id: number;
	createdAt: Date;
	senderId: number;
}

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	const conversations = await db.findConversations(
		parseInt(req.params.receiverId),
		parseInt(req.params.senderId)
	);

	if (!conversations) {
		res.status(500).json({
			message: "Unable to fetch conversations. Try again later",
		});
	}

	const receivedMessages = (conversations?.receivedMessages ?? []).filter(
		(message: ReceivedMessage) =>
			message.senderId === parseInt(req.params.senderId)
	);

	const sentMessages = (conversations?.sentMessages ?? []).filter(
		(message: SentMessage) =>
			message.receiverId === parseInt(req.params.senderId)
	);

	const allMessages = [...receivedMessages, ...sentMessages];
	const sortedMessages = allMessages.sort(
		(a, b) => a.createdAt.getTime() - b.createdAt.getTime()
	);

	if (sortedMessages) {
		res.status(200).json({ messages: sortedMessages });
	} else
		res.status(500).json({
			message: "Unable to retrieve messages. Try again later",
		});
});

export const postMessage = expressAsyncHandler(async (req, res, next) => {
	const verifiedUser = validateJWTAndGetUser(req.token);
	if (verifiedUser === null) {
		res.send(403).json({ message: "Access forbidden. Try again later" });
	}

	const senderId = parseInt(req.params.id);
	const receiverId = parseInt(req.body.receiverUserId);

	const createdMessage = await db.createMessage(
		req.body.message,
		senderId,
		receiverId
	);

	res.json({ createdMessage: createdMessage });
});
