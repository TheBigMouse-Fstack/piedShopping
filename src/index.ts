import express from 'express'
import userRouter from './routes/users.routers' // Router cho người dùng
import databaseServices from './services/database.services' // Kết nối database
import { defaultErrorHandler } from './middlewares/errors.middlewares'
import mediaRouter from './routes/medias.routers'
import { initFolder } from './utils/file'
import staticRouter from './routes/static.router'

// Khởi tạo server
const app = express()
databaseServices.connect() // Kết nối đến database
// kiểm tra có thiếu folder nào ko
initFolder()
// Middleware để chuyển đổi req.body thành JSON
app.use(express.json())

// Gán router cho đường dẫn /users
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)

app.use(defaultErrorHandler)
// Lắng nghe cổng PORT
app.listen(process.env.PORT, () => {
  console.log(`Project này đang chạy trên post ${process.env.PORT}`)
})
