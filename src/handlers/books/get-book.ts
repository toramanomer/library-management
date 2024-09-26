import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'

export const getBookSchema = z.object({ id: positiveInt })
type GetBookSchema = z.infer<typeof getBookSchema>

export const getBook = async (
	request: Request<GetBookSchema>,
	response: Response
) => {
	const book = await db.Book.findByPk(
		request.params.id,
		{ attributes: ['id', 'name', 'scoreCount', 'reviewCount', 'scoreCount', 'score'] }
	)

	if (!book)
		response.status(404).json({ message: 'Book not found' })
	else
		response.json({
			id: book.id,
			name: book.name,
			score: book.score
		})
}
