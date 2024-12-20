-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_Messagesid_fkey";

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "receivedMessagesId" INTEGER,
ADD COLUMN     "sentMessagesId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_senderMessagesId_fkey" FOREIGN KEY ("senderMessagesId") REFERENCES "Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
