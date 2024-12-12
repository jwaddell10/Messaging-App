import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import db from "../db/queries";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const signUpPost = asyncHandler(
	async (
		req: { body: { username: string; password: string } },
		res: any,
		next: any
	) => {
		const user = await db.findUser(req.body.username);
		if (user !== null) {
			res.json({ message: "Username is already taken. Try another" });
		}

		const createdUser = await db.createUser(
			req.body.username,
			req.body.password
		);

		const secret = process.env.JWT_SECRET;

		if (!secret) {
			throw new Error(
				"JWT_SECRET is not defined in environment variables"
			);
		}

		jwt.sign({ user }, secret, { expiresIn: "1h" }, (error, token) => {
			if (error) {
				res.json({ error });
			}
			console.log(token, "this is token");
			res.json({ token });
		});
	}
);

export const logInPost = asyncHandler(
	async (req: { body: any }, res: any, next: any) => {
		console.log(res, "this is res", req, "this is req in login");
		console.log(req.body, "login post req body");
	}
);
