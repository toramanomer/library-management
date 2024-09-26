import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'
import { AppException } from '../../core/exceptions'

export const borrowBookSchema = z.object({
	userId: positiveInt,
	bookId: positiveInt
})
type BorrowBookSchema = z.infer<typeof borrowBookSchema>

export const borrowBook = async (
	request: Request<BorrowBookSchema>,
	response: Response
) => {
	const { userId, bookId } = request.params
	await db.sequelize.transaction(async transaction => {
		const [book, user] = await Promise.all([
			db.Book.findByPk(bookId, { transaction }),
			db.User.findByPk(userId, { transaction, attributes: ['id'] })
		])

		if (!book)
			throw new AppException(`Book with id ${bookId} not found.`, 404)
		if (!book.isAvailable)
			throw new AppException(`${book.name} is not available for borrowing at the moment.`, 409)

		if (!user)
			throw new AppException(`User with id ${userId} not found.`, 404)

		const [borrowing, [affectedCount]] = await Promise.all([
			db.Borrowing.create(
				{ userId: user.id, bookId: book.id, name: book.name },
				{ transaction, returning: true }
			),
			db.Book.update(
				{ isAvailable: false },
				{ where: { id: book.id, isAvailable: true }, transaction }
			)
		])

		if (!borrowing || !affectedCount)
			throw new AppException('An error occurred while borrowing the book.', 500)

	})

	response.sendStatus(204)
}