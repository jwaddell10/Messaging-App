import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import { create } from "domain";

export default {
	findUser: async (username: string) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					name: username,
				},
			});
			return user;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	createUser: async (name: string, password: string) => {
		try {
			const saltRounds = 8;
			const securePassword = await bcrypt.hash(password, saltRounds);

			const createdUser = await prisma.user.create({
				data: {
					name: name,
					password: securePassword,
				},
			});
			return createdUser;
		} catch (error: any) {
			throw new Error(error);
		}
	},
};
