import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'

export const createBookSchema = z.object({ name: z.string().trim().min(1) })
type CreateBookSchema = z.infer<typeof createBookSchema>

export const createBook = async (
	request: Request<unknown, unknown, CreateBookSchema, unknown>,
	response: Response
) => {
	const book = await db.Book.create({
		name: request.body.name,
		reviewCount: 0,
		scoreCount: 0,
		isAvailable: true
	})
	response.json(book)
}