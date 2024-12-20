import expressAsyncHandler from "express-async-handler";
import db from "../db/queries";
import { validateJWTAndGetUser } from "../passport/jwt";
import { create } from "domain";

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	console.log(req.params.id, "this is req paramsid getmessages");

	const receivedMessages = await db.findReceivedMessages(
		parseInt(req.params.id)
	);
	res.json({ messages: receivedMessages });
});

export const postMessage = expressAsyncHandler(async (req, res, next) => {
	const verifiedUser = validateJWTAndGetUser(req.token);
	if (verifiedUser === null) {
		res.send(403).json({ message: "Access forbidden. Try again later" });
	}
	console.log();
	// const createdMessage = await db.createMessage(req.body.message)
	// console.log(createdMessage, 'created message')
});
