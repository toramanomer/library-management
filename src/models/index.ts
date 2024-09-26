import { sequelize } from '../config/database'
import { Book } from './book.model'
import { Borrowing } from './borrowing.model'
import { User } from './user.model'

export const db = {
	sequelize,
	Book,
	Borrowing,
	User
}
