import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'

export const returnBookSchema = z.object({})
type ReturnBookSchema = z.infer<typeof returnBookSchema>

export const returnBook = async (
	request: Request<ReturnBookSchema>,
	response: Response
) => {
	const { userId, bookId } = request.params as { userId: string, bookId: string }
	const { score } = request.body
	try {
		await db.sequelize.transaction(async transaction => {
			await Promise.all([
				db.Borrowing.update({
					returnedAt: new Date(),
					score
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
		})
		response.sendStatus(204)
	} catch (error) {
		console.log(error)
		response.status(500).json({ error: error?.message })
	}
}
