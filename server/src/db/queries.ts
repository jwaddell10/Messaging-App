import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

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
	findAllUsers: async () => {
		try {
			const users = await prisma.user.findMany({
				select: {
					id: true,
					name: true,
					password: false,
					senderMessagesId: true,
					receiverMessagesid: true,
					Messagesid: true,
					sender: true,
					receiver: true,
					Messages: true,
				},
			});
			return users;
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
