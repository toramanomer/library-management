import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'
import { AppException } from '../../core/exceptions'

export const returnBookSchema = z.object({
	userId: positiveInt,
	bookId: positiveInt
})
type ReturnBookSchema = z.infer<typeof returnBookSchema>

export const returnBook = async (
	request: Request<ReturnBookSchema>,
	response: Response
) => {
	const { userId, bookId } = request.params
	const { score } = request.body

	await db.sequelize.transaction(async transaction => {
		const borrowing = await db.Borrowing.findOne({
			where: { userId, bookId, returnedAt: null },
			transaction
		})
		if (!borrowing)
			throw new AppException('No active borrowing record found for this user and book', 404)
		if (borrowing.returnedAt)
			throw new AppException('This book has already been returned', 409)


		const [, [affectedCount]] = await Promise.all([
			db.Borrowing.update({
				returnedAt: new Date(),
				userScore: score
			}, { where: { userId, bookId, returnedAt: null }, transaction }),
			db.Book.update(
				{
					isAvailable: true,
					reviewCount: db.sequelize.literal('reviewCount + 1'),
					scoreCount: db.sequelize.literal(`scoreCount + ${score}`)
				},
				{ where: { id: bookId, isAvailable: false }, transaction }
			)
		])

		if (!affectedCount)
			throw new AppException('An error occurred while returning the book.', 500)
	})

	response.sendStatus(204)
}
