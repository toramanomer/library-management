import type { Request, Response } from 'express'
import { db } from '../../models'

export const listUsers = async (
	request: Request,
	response: Response
) => {
	const users = await db.User.findAll({
		limit: 20,
		attributes: ['id', 'name']
	})
	response.json(users)
}