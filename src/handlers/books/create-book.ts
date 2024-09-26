import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { nonEmptyString } from '../../core/schemas'

export const createBookSchema = z.object({ name: nonEmptyString })
type CreateBookSchema = z.infer<typeof createBookSchema>

export const createBook = async (
	request: Request<unknown, unknown, CreateBookSchema, unknown>,
	response: Response
) => {
	await db.Book.create({
		name: request.body.name,
		reviewCount: 0,
		scoreCount: 0,
		isAvailable: true
	})
	response.sendStatus(201)
}