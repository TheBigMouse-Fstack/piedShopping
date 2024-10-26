// import các interface build-in của express dể mô tả
import { Request, Response, NextFunction } from 'express'
// middleware la handler giúp kiểm tra dữ liệu mà người dùng truyền lên
// có đủ và đúng như nhu cầu định dạng ko

// giờ ta sẽ phát triển chức năng login
// và cần kiểm tra xem email và password có đủ hay ko?

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  // nếu không có 1 trong 2 thằng email và password thì chữi
  if (!email || !email) {
    res.status(400).json({
      message: 'Missing email or password'
    })
  } else {
    next()
  }
}
