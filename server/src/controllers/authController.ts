import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import db from "../db/queries";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../passport/jwt";
require("dotenv").config();

const secret = process.env.JWT_SECRET;

if (!secret) {
	throw new Error("JWT_SECRET is not defined in environment variables");
}

export const signUpPost = asyncHandler(
	async (req: { body: { username: string; password: string } }, res: any) => {
		const user = await db.findUser(req.body.username);
		if (user) {
			return res.json({
				message: "Username is already taken. Try another",
			});
		}

		const createdUser = await db.createUser(
			req.body.username,
			req.body.password
		);

		jwt.sign(
			{ createdUser },
			secret,
			{ expiresIn: "1d" },
			(error, token) => {
				if (error) {
					res.json({ error });
				}
				res.json({ token });
			}
		);
	}
);

export const logInPost = asyncHandler(
	async (req: { body: { username: string; password: string } }, res: any) => {
		const { username, password } = req.body;
		const user = await db.findUser(username);

		if (!user) {
			return res.status(401).json({ message: "Incorrect username" });
		}

		const match = await bcrypt.compare(password, user.password);

		if (match) {
			const token = await generateToken(username as string);
			res.json({ token });
		} else {
			res.status(401).json({ message: "Incorrect password" });
		}
	}
);
