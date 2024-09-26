import {
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model
} from 'sequelize'
import { sequelize } from '../config/database'

export class Book extends Model<
	InferAttributes<Book>,
	InferCreationAttributes<Book, { omit: 'id' | 'score' | 'createdAt' | 'updatedAt' }>
> {
	declare id: number
	declare name: string
	declare isAvailable: boolean

	declare reviewCount: number
	declare scoreCount: number
	declare score: number

	declare readonly createdAt: Date
	declare readonly updatedAt: Date
}

Book.init(
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
		reviewCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isAvailable: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		scoreCount: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		score: {
			type: DataTypes.INTEGER,
			get() {
				console.log({
					reviewCount: this.reviewCount,
					scoreCount: this.scoreCount
				})
				if (this.reviewCount === 0) return -1
				return Number((this.scoreCount / this.reviewCount).toFixed(2))
			}
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
