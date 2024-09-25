import { Router } from 'express'
import { User } from '../models/user.model'
const userRouter = Router()

userRouter.post('/', async (req, res) => {
	const user = await User.create({ name: req.body.name })
	res.json(user)
})

export { userRouter }