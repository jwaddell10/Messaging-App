import expressAsyncHandler from "express-async-handler";
import db from "../db/queries";
import { validateJWTAndGetUser } from "../passport/jwt";

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	console.log(req.params, "this is req paramsid getmessages");
	const conversations = await db.findConversations(
		parseInt(req.params.receiverId),
		parseInt(req.params.senderId)
	);
	// console.log(
	// 	conversations?.sentMessages,
	// 	"conversations sent in get messages",
	// 	conversations?.receivedMessages,
	// 	"conv received"
	// );
	console.log(req.params.receiverId, "req reciever id");
	//if person receiving the message is the same as the selected receiver, keep message
	//if person sending message sends it to the person receiving the message, keep message

	const receivedMessages = conversations?.receivedMessages.filter(
		(message) => message.senderId === parseInt(req.params.senderId)
	);

	const sentMessages = conversations?.sentMessages.filter(
		(message) => message.receiverId === parseInt(req.params.senderId)
	);

	if (receivedMessages && sentMessages) {
		res.json({
			receivedMessages: receivedMessages,
			sentMessages: sentMessages,
		});
	} else
		res.status(400).json({
			message:
				"An error has occurred with fetching messages. Try again later",
		});

	//rec doesnt fillter correctly....
	// conversations?.receivedMessages.filter(
	// 	(message) => message.senderId === parseInt(req.params.senderId)
	// ),
	// console.log(receivedMessages, "received", sentMessages, "sent messages");
	// console.log(conversations, "conversatiosn in get messages");
	// console.log(conversations, 'conversations')

	// if (conversations === null) {
	// 	res.json({
	// 		message: "No messages yet. Create a message to start conversation",
	// 	});
	// }

	// if (conversations) {
	// 	res.json(conversations);
	// }
	// const sender = conversations.filter((message) => message.sender)
	// console.log(receiver, 'receiver', sender, 'sender')
	// console.log(typeof checkNull, 'check null')
	// if (checkNull === null) {
	//     console.log('its null')
	// }
	// res.json({ messages: conversations });
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
