# Library Management Application

## Overview

This is a Library Management Application designed to manage members and the borrowing of books. It is built using TypeScript, NodeJS, Express, SQLite, and Sequelize. The application provides functionality to manage users and books, as well as track borrowing and returning activities.

## Technologies

- **TypeScript**
- **NodeJS**
- **Express**
- **Zod**
- **SQLite** (In Memory)
- **Sequelize**

## Database Schema

The application uses the following database schema and DDL script can be found in the [schema.sql](schema.sql) file.

### Books Table

```sql
CREATE TABLE "Books" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR(255) NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isAvailable" TINYINT(1) NOT NULL DEFAULT 1,
    "scoreCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE "Users" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Borrowings Table
```sql
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
```

## API Endpoints

The following endpoints are available for managing users and books:

### Users
- **Get Users**
	- Method: GET
	- URL: /users
	- Description: Lists all users.
- **Get User**
	- Method: GET
	- URL: /users/{id}
	- Description: Retrieves a specific user by ID, including their borrowing history.
- **Create User**
	- Method: POST
	- URL: /users
	- Body: { "name": "User Name" }
	- Description: Creates a new user.

### Books
- **Get Books**
	- Method: GET
	- URL: /books
	- Description: Lists all books.
- **Get Book**
	- Method: GET
	- URL: /books/{id}
	- Description: Retrieves a specific book by ID, including its average score.
- **Create Book**
	- Method: POST
	- URL: /books
	- Body: { "name": "Book Title" }
	- Description: Creates a new book.

### Borrowing and Returning Books
- **Borrow Book**
	- Method: POST
	- URL: /users/{userId}/borrow/{bookId}
	- Description: Allows a user to borrow a book.
- **Return Book**
	- Method: POST
	- URL: /users/{userId}/return/{bookId}
	- Body: { "score": User Score }
	- Description: Allows a user to return a book and provide a rating.