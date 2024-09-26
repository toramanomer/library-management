import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../../models'
import { nonEmptyString } from '../../core/schemas'

export const createUserSchema = z.object({ name: nonEmptyString })
type CreateUserSchema = z.infer<typeof createUserSchema>

export const createUser = async (
	request: Request<unknown, unknown, CreateUserSchema, unknown>,
	response: Response
) => {
	await db.User.create({ name: request.body.name })
	response.sendStatus(201)
}
