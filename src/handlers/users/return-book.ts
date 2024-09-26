import { type Request, type Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'
import { AppException } from '../../core/exceptions'

export const returnBookSchema = {
	body: z.object({
		score: z
			.number({
				invalid_type_error: 'Score must be a number',
				required_error: 'Score is required'
			})
			.int('Score must be an integer')
			.min(1, 'Score cannot be less than 1')
			.max(10, 'Score cannot be greater than 10')
	}),
	params: z.object({
		userId: positiveInt,
		bookId: positiveInt
	})
}
type ReturnBookSchemaParams = z.infer<typeof returnBookSchema['params']>
type ReturnBookSchemaBody = z.infer<typeof returnBookSchema['body']>

export const returnBook = async (
	request: Request<ReturnBookSchemaParams, unknown, ReturnBookSchemaBody>,
	response: Response
) => {
	const { userId, bookId } = request.params
	const { score } = request.body

	await db.sequelize.transaction(async transaction => {
		const borrowing = await db.Borrowing.findOne({
			where: { userId, bookId, returnedAt: null },
			transaction,
			lock: true
		})
		if (!borrowing)
			throw new AppException('No active borrowing record found for this user and book', 404)
		if (borrowing.returnedAt)
			throw new AppException('This book has already been returned', 409)


		const [, [affectedCount]] = await Promise.all([
			db.Borrowing.update({
				returnedAt: new Date(),
				userScore: score
			}, { where: { userId, bookId }, transaction }),
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
