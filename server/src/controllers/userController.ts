import expressAsyncHandler from "express-async-handler";
const asyncHandler = expressAsyncHandler;
import { Request, Response, NextFunction } from "express";
import { validateJWTAndGetUser } from "../passport/jwt";
import db from "../db/queries";

export const getAllUsers = asyncHandler(async (req, res, next) => {
	console.log(req.token, 'req token')
	const verifiedUser = validateJWTAndGetUser(req.token);

	if (!verifiedUser) {
		res.status(401).json({
			message:
				"Unable to validate user credentials. Try logging out/logging in to reauthenticate",
		});
		return;
	}
	const users = await db.findAllUsers();

	if (!users) {
		res.sendStatus(400).json({ message: "No users at this time." });
		return;
	}

	if (users) {
		res.json({ users });
		return;
	}
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
	const profile = await db.findUserById(parseInt(req.params.id));

	if (!profile) {
		res.status(400).json({
			message: "Customize your profile",
		});
	}
	if (profile) {
		res.status(200).json({ profile });
	}
});

export const updateUserProfile = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		//check if user can access
		const verifiedUser = validateJWTAndGetUser(req.token);

		if (!verifiedUser) {
			res.status(401).json({
				message:
					"Unable to validate user credentials. Try again later.",
			});
		}

		const profile = await db.updateUserBio(
			parseInt(req.params.id),
			req.body.bio
		);

		if (profile === null) {
			res.sendStatus(400).json({ message: "An error has occured" });
		}

		res.json({ profile });
	}
);
