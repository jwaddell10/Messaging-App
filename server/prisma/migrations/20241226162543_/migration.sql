/*
  Warnings:

  - You are about to drop the column `receivedMessagesId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `sentMessagesId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `Messagesid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `receiverMessagesid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `senderMessagesId` on the `User` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_Messagesid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_receiverMessagesid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_senderMessagesId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "receivedMessagesId",
DROP COLUMN "sentMessagesId",
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Messagesid",
DROP COLUMN "receiverMessagesid",
DROP COLUMN "senderMessagesId";

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
