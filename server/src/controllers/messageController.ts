import expressAsyncHandler from "express-async-handler";
import db from "../db/queries";
import { validateJWTAndGetUser } from "../passport/jwt";

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	console.log(req.params.id, "this is req paramsid getmessages");

	const conversations = await db.findConversations(
		parseInt(req.params.id)
	);
    // console.log(conversations, 'conversations')

    // const receiver = conversations.filter((message) => message.receiver)
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
    console.log(req.body, 'req body in post')

	const createdMessage = await db.createMessage(req.body.message, senderId, receiverId)
	console.log(createdMessage, 'created message')
});
