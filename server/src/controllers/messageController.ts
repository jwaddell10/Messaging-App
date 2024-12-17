import expressAsyncHandler from "express-async-handler";
import db from "../db/queries";

export const getMessages = expressAsyncHandler(async (req, res, next) => {
	console.log(req.params.id, "this is req paramsid getmessages");

	const receivedMessages = await db.findReceivedMessages(
		parseInt(req.params.id)
	);
});
