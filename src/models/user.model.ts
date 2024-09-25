import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model
} from 'sequelize'
import { sequelize } from '../config/database'

export class User extends Model<
	InferAttributes<User>,
	InferCreationAttributes<User, { omit: 'id' | 'createdAt' | 'updatedAt' }>
> {
	declare id: number
	declare name: string

	declare createdAt: Date
	declare updatedAt: Date
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
	{
		sequelize,
		tableName: 'Users'
	}
)
