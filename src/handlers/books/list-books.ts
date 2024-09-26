import type { Request, Response } from 'express'
import { db } from '../../models'

export const listBooks = async (
	request: Request,
	response: Response
) => {
	const books = await db.Book.findAll({ attributes: ['id', 'name'] })
	response.json(books)
}
