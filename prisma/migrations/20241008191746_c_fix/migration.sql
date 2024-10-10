/*
  Warnings:

  - A unique constraint covering the columns `[memberTwo,memberOne]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_memberTwo_memberOne_key" ON "Chat"("memberTwo", "memberOne");
