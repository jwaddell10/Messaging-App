import express, { Express, Request, Response } from "express";
import logger from "morgan";
import path from "path";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import errorHandler from "./middlewares/errorHandler";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT || "3000";

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
//need to setup passport and sessions//

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.get("/", (req: Request, res: Response) => {
	res.send("Hello, this is Express + TypeScript");
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`[Server]: I am running at http://localhost:${port}`);
});
