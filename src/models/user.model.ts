import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize'
import { sequelize } from '../config/database'
import { Borrowing } from './borrowing.model'

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User, { omit: 'id' | 'createdAt' | 'updatedAt' }>
> {
	declare id: number
	declare name: string

	declare readonly createdAt: Date
	declare readonly updatedAt: Date

	declare books: NonAttribute<Borrowing[]>

}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
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
