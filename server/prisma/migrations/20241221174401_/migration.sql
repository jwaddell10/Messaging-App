-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_Messagesid_fkey" FOREIGN KEY ("Messagesid") REFERENCES "Messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
