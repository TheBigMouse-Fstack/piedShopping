import express from 'express'
import userRouter from './routes/users.routers' // Router cho người dùng
import databaseServices from './services/database.services' // Kết nối database
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import mediaRouter from './routes/medias.routers'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.routers'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import brandRouter from './routes/brands.routers'

dotenv.config()

// Khởi tạo server
const app = express()
// Kết nối đến database
databaseServices.connect().then(() => {
  databaseServices.createIndexes()
  databaseServices.createIndexRefreshTokens()
})

// kiểm tra có thiếu folder nào ko
initFolder()
// Middleware để chuyển đổi req.body thành JSON
app.use(express.json())
//////
// Gán router cho đường dẫn /users
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)
app.use('/brands', brandRouter)

app.use(defaultErrorHandler)
// Lắng nghe cổng PORT
app.listen(process.env.PORT, () => {
  console.log(`Project này đang chạy trên post ${process.env.PORT}`)
})
