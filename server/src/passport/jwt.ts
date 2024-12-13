require("dotenv").config();
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not defined in the environment variables");
}

const generateToken = async (user: string) => {
	return jwt.sign({ user }, JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bearerHeader = req.headers["authorization"];
	console.log(bearerHeader, "bearer header");

	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];

		(req as any).token = bearerToken;
		next();
	} else {
		res.status(403).json({
			message: "Access Forbidden. Try again later",
		});
	}
};

function verifyJWT(token: string) {
	try {
		const verifiedUser = jwt.verify(token, JWT_SECRET as string);
		return verifiedUser;
	} catch (error) {
		console.error("JWT verification failed:", error);
		return null;
	}
}

export { generateToken, verifyToken, verifyJWT };
