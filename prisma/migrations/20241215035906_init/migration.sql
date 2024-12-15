-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tags" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "completeName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "BelongsToAuthor" INTEGER NOT NULL,
    CONSTRAINT "Post_BelongsToAuthor_fkey" FOREIGN KEY ("BelongsToAuthor") REFERENCES "Author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "BelongsToPost" INTEGER NOT NULL,
    "BelongsToUser" INTEGER NOT NULL,
    CONSTRAINT "Comment_BelongsToPost_fkey" FOREIGN KEY ("BelongsToPost") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_BelongsToUser_fkey" FOREIGN KEY ("BelongsToUser") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
