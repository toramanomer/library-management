import { resolve } from 'node:path'
import { Sequelize } from 'sequelize'


export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: resolve(import.meta.dirname, '../../test.sqlite')
})
