import express from 'express'
import { userRouter } from '@users/get-user'
import { db } from './models'


const app = express()
app.use(express.json())
app.disable('x-powered-by')


await db.sequelize.sync({ force: true })
app.use('/users', userRouter)

app.listen(3000, () => {
	  console.log('Server is running on http://localhost:3000')
})
