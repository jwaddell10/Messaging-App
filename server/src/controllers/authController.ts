import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import db from "../db/queries";
import bcrypt from "bcryptjs";
import { generateUserJWT } from "../passport/jwt";
require("dotenv").config();

const secret = process.env.JWT_SECRET;

if (!secret) {
	throw new Error("JWT_SECRET is not defined in environment variables");
}

export const signUpPost = asyncHandler(
	async (req: { body: { username: string; password: string } }, res: any) => {
		const user = await db.findUserByName(req.body.username);
		if (user) {
			return res.json({
				message: "Username is already taken. Try another",
			});
		}

		const createdUser = await db.createUser(
			req.body.username,
			req.body.password
		);

		if (createdUser) {
			const token = await generateUserJWT(createdUser.name);
			res.json({ token: token, username: createdUser.name });
		}
	}
);

export const logInPost = asyncHandler(
	async (req: { body: { username: string; password: string } }, res: any) => {
		const { username, password } = req.body;
		const user = await db.findUserByName(username);
		if (!user) {
			return res.status(401).json({ message: "Incorrect username" });
		}

		const match = await bcrypt.compare(password, user.password);
		if (match) {
			const token = await generateUserJWT(username as string);
			res.json({ token: token, username: username, id: user.id  });
		} else {
			res.status(401).json({ message: "Incorrect password" });
		}
	}
);
