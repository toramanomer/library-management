-- Create table for Books
CREATE TABLE "Books" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR(255) NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isAvailable" TINYINT(1) NOT NULL DEFAULT 1,
    "scoreCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create table for Users
CREATE TABLE "Users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create table for Borrowings
CREATE TABLE "Borrowings" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "userScore" INTEGER DEFAULT NULL,
    "name" VARCHAR(255) NOT NULL,
    "returnedAt" DATETIME DEFAULT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "bookId" INTEGER,
    FOREIGN KEY("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY("bookId") REFERENCES "Books"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
