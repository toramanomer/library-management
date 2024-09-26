import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { BaseError } from 'sequelize'

import { db } from './models'
import { userRouter } from './routes/users'
import { bookRouter } from './routes/books'
import { AppException } from './core/exceptions'

const app = express()
app.use(express.json())

await db.sequelize.sync()


app.use('/users', userRouter)
app.use('/books', bookRouter)
app.use(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	(error: Error, request: Request, response: Response, next: NextFunction) => {
		if (error instanceof AppException)
			response.status(error.statusCode).json({ error: error.message })
		else if (error instanceof BaseError)
			response.status(500).json({ message: 'Operation failed' })
		else
			response.status(500).json({ message: 'An unknown error occurred' })
	}
)

app.listen(3000)
