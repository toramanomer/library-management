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
	InferCreationAttributes<Borrowing, { omit: 'createdAt' | 'updatedAt' | 'userScore' | 'returnedAt'  }>
> {
	declare userId: ForeignKey<User['id']>
	declare bookId: ForeignKey<Book['id']>
	declare name: string
	declare userScore: string

	declare returnedAt: Date | null
	declare readonly createdAt: Date
	declare readonly updatedAt: Date
}

Borrowing.init(
	{
		userScore: { type: DataTypes.STRING },
		name: { type: DataTypes.STRING, allowNull: false },
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
