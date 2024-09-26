import type { Request, Response } from 'express'
import { db } from '../../models'

export const listUsers = async (
	request: Request,
	response: Response
) => {
	const users = await db.User.findAll({ attributes: ['id', 'name'] })
	response.json(users)
}