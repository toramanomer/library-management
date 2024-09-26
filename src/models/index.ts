import { sequelize } from '../config/database'
import { Book } from './book.model'
import { Borrowing } from './borrowing.model'
import { User } from './user.model'

User.hasMany(Borrowing, { foreignKey: 'userId' })
Book.hasMany(Borrowing, { foreignKey: 'bookId' })
Borrowing.belongsTo(User, { foreignKey: 'userId' })
Borrowing.belongsTo(Book, { foreignKey: 'bookId' })

export const db = {
	sequelize,
	Book,
	Borrowing,
	User
}
