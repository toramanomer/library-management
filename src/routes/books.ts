import express from 'express'

import { listBooks } from '../handlers/books/list-books'
import {
	processRequestBody,
	processRequestParams
} from 'zod-express-middleware'
import {
	getBook,
	getBookSchema
} from '../handlers/books/get-book'
import {
	createBook,
	createBookSchema
} from '../handlers/books/create-book'

export const bookRouter = express.Router()

bookRouter.get('/:id', processRequestParams(getBookSchema), getBook)
bookRouter.get('/', listBooks)
bookRouter.post('/', processRequestBody(createBookSchema), createBook)
