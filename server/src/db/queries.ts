import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

export default {
	findUserByName: async (username: string) => {
		try {
			const user = await prisma.user.findUnique({
				select: {
					id: true,
					bio: true,
					name: true,
					password: true,
					sentMessages: true,
					receivedMessages: true,
					// Messagesid: true,
					// Messages: true,
				},
				where: {
					name: username,
				},
			});
			return user;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	findUserById: async (id: number) => {
		try {
			const profile = await prisma.user.findUnique({
				select: {
					id: true,
					bio: true,
					name: true,
					password: false,
					sentMessages: true,
					receivedMessages: true,
					// Messagesid: true,
					// Messages: true,
				},
				where: {
					id: id,
				},
			});
			return profile;
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
					sentMessages: true,
					receivedMessages: true,
					// Messagesid: true,
					// Messages: true,
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
	updateUserBio: async (id: number, bio: string) => {
		try {
			const user = await prisma.user.update({
				select: {
					id: true,
					bio: true,
					name: true,
					password: false,
					sentMessages: true,
					receivedMessages: true,
					// Messagesid: true,
					// Messages: true,
				},
				where: {
					id: id,
				},
				data: {
					bio,
				},
			});
			return user;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	findConversations: async (id: number) => {

		/* trying to fetch all messages this user is involved in
			includes messages user sent, and messages user received
		*/
		try {
			const conversations = await prisma.user.findUnique({
				where: {
					id: id
				},
				select: {
					receivedMessages: {
						select: {
							text: true
						}
					},
					sentMessages: {
						select: {
							text: true
						}
					}
				}
				
				// select: {
				// 	receiver: {
				// 		select: {
				// 			text: true,
				// 		}
				// 	},
				// 	sender: {
				// 		select: {
				// 			text: true
				// 		}
				// 	}
				// }
			});
			console.log(conversations, 'conversations')
			return conversations;
		} catch (error: any) {
			throw new Error(error);
		}
	},
	createMessage: async (
		text: string,
		senderId: number,
		receiverId: number
	) => {
		// console.log(senderId, 'sender id inc')
		try {
			const createdMessage = await prisma.messages.create({
				data: {
					text: text,
					createdAt: new Date(),
					sender: {
						connect: { id: senderId },
					},
					receiver: {
						connect: { id: receiverId },
					},
				},
			});
			return createdMessage;
		} catch (error: any) {
			throw new Error(error);
		}
	},
};
