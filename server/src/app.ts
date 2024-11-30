import express, { Express, Request, Response } from "express";
import logger from "morgan";
import path from 'path';
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();

const app: Express = express();
const port = process.env.PORT || '3000';

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
	res.send("Hello, this is Express + TypeScript");
});

app.listen(port, () => {
	console.log(`[Server]: I am running at https://localhost:${port}`);
});
