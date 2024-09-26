import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	ForeignKey
} from 'sequelize'
import { sequelize } from '../config/database'
import { User } from './user.model'
import { Book } from './book.model'

export class Borrowing extends Model<
	InferAttributes<Borrowing>,
	InferCreationAttributes<Borrowing, { omit: 'createdAt' | 'updatedAt' | 'score' | 'returnedAt'  }>
> {
	declare userId: ForeignKey<User['id']>
	declare bookId: ForeignKey<Book['id']>
	declare score: string

	declare returnedAt: Date | null
	declare readonly createdAt: Date
	declare readonly updatedAt: Date
}

Borrowing.init(
	{
		score: { type: DataTypes.STRING },
		returnedAt: { type: DataTypes.DATE },
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{ sequelize }
)

User.hasMany(Borrowing, { foreignKey: 'userId' })
Book.hasMany(Borrowing, { foreignKey: 'bookId' })
Borrowing.belongsTo(User, { foreignKey: 'userId' })
Borrowing.belongsTo(Book, { foreignKey: 'bookId' })
