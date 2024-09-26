import { sequelize } from '../config/database'
import { Book } from './book.model'
import { Borrowing } from './borrowing.model'
import { User } from './user.model'

User.hasMany(Borrowing, { foreignKey: 'userId', as: 'books' })
Borrowing.belongsTo(User, { foreignKey: 'userId' })

Book.hasMany(Borrowing, { foreignKey: 'bookId' })
Borrowing.belongsTo(Book, { foreignKey: 'bookId' })

export const db = {
	sequelize,
	Book,
	Borrowing,
	User
}
