import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'

export const getUserSchema = z.object({ id: positiveInt })
type GetUserSchema = z.infer<typeof getUserSchema>

type BorrowedBooks = {
	past: { name: string, userScore: number }[],
	present: { name: string }[]
}

export const getUser = async (
	request: Request<GetUserSchema>,
	response: Response
) => {
	const user = await db.User.findByPk(request.params.id, {
		attributes: ['id', 'name'],
		include: { model: db.Borrowing,  attributes: ['name', 'userScore'], as: 'books'  }
	})

	if (!user)
		response.status(404).json({ message: 'User not found' })
	else {
		const { id, name } = user
		const books = (user.books ?? []).reduce<BorrowedBooks>((books, book) => {
			if (book.userScore)
				return {
					past: [...books.past, book],
					present: books.present
				}
			return {
				past: books.past,
				present: [...books.present, { name: book.name }]
			}
		}, { past: [], present: [] })

		response.json({ id, name, books })
	}
}
