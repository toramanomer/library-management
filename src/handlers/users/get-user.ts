import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { positiveInt } from '../../core/schemas'

export const getUserSchema = z.object({ id: positiveInt })
type GetUserSchema = z.infer<typeof getUserSchema>

export const getUser = async (
	request: Request<GetUserSchema>,
	response: Response
) => {
	const user = await db.User.findByPk(request.params.id, {
		include: [{
			model: db.Borrowing,
			attributes: ['bookId', 'score', 'returnedAt'],
			include: [{ model: db.Book, attributes: ['name'] }]
		  }]
	})

	if (!user)
		response.status(404).json({ message: 'User not found' })
	else
		response.json(user?.toJSON())
}
