import { Router } from 'express'
import { processRequestBody, processRequestParams } from 'zod-express-middleware'

import { createUser, createUserSchema } from '../handlers/users/create-user'
import { listUsers } from '../handlers/users/list-users'
import { getUser, getUserSchema } from '../handlers/users/get-user'
import { borrowBook, borrowBookSchema } from '../handlers/users/borrow-book'
import { returnBook } from '../handlers/users/return-book'

export const userRouter = Router()

userRouter.use('/:userId/borrow/:bookId', processRequestParams(borrowBookSchema), borrowBook)
userRouter.use('/:userId/return/:bookId', returnBook)
userRouter.get('/:id', processRequestParams(getUserSchema), getUser)
userRouter.post('/', processRequestBody(createUserSchema), createUser)
userRouter.get('/', listUsers)
