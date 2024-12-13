import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import db from "../db/queries";

export const getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await db.findAllUsers();

	if (!users) {
		res.json({ message: "No users at this time." });
	}

	res.json({ users });
});
