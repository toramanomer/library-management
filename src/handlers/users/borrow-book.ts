import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { BaseError } from 'sequelize'
import { positiveInt } from '../../core/schemas'

export const borrowBookSchema = z.object({
	userId: positiveInt,
	bookId: positiveInt
})
type BorrowBookSchema = z.infer<typeof borrowBookSchema>


export class TransactionError extends Error {
	constructor(message: string, public statusCode: number) {
		super(message)
		this.name = 'TransactionError'
		this.statusCode = statusCode

		Object.setPrototypeOf(this, TransactionError.prototype)
	}
}












export const borrowBook = async (
	request: Request<BorrowBookSchema>,
	response: Response
) => {
	const { userId, bookId } = request.params
	try {
		await db.sequelize.transaction(async transaction => {
			const [book, user] = await Promise.all([
				db.Book.findByPk(bookId, { transaction }),
				db.User.findByPk(userId, { transaction, attributes: ['id'] })
			])

			if (!book)
				throw new TransactionError(`Book with id ${bookId} not found.`, 404)
			if (!book.isAvailable)
				throw new TransactionError(`${book.name} is not available for borrowing at the moment.`, 409)

			if (!user)
				throw new TransactionError(`User with id ${userId} not found.`, 404)


			const [borrowing, affectedCount] = await Promise.all([
				db.Borrowing.create(
					{ userId: user.id, bookId: book.id },
					{ transaction }
				),
				db.Book.update(
					{ isAvailable: false },
					{ where: { id: book.id, isAvailable: true }, transaction }
				)
			])
			if (!borrowing || !affectedCount)
				throw new TransactionError('An error occurred while borrowing the book.', 500)

			return true
		})

		response.sendStatus(204)
	} catch (error) {
		if (error instanceof TransactionError)
			return response.status(error.statusCode).json({ error: error.message })
		if (error instanceof BaseError)
			return response.status(500).json({ error: error.message })

		throw error
	}
}