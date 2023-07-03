/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
