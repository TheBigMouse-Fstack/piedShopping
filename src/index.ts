import express from 'express';
import userRouter from './routes/users.routers'; // Router cho người dùng
import databaseServices from './services/database.services'; // Kết nối database

// Khởi tạo server
const app = express();
const PORT = 3000;
databaseServices.connect(); // Kết nối đến database

// Middleware để chuyển đổi req.body thành JSON
app.use(express.json());

// Gán router cho đường dẫn /users
app.use('/users', userRouter);

// Lắng nghe cổng PORT
app.listen(PORT, () => {
  console.log(`Project này đang chạy trên post ${PORT}`);
});
