import { Request, Response } from 'express'
import usersServices from '~/services/users.services'
// controller là hande điều phối các dữ liệu vào đúng các service xử lí
//trính xuất dữ liệu

//controller là nơi xử lý logic , dữ liệu khi đến tầng này phải clean rồi
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  // mình sẽ dùng email và password để vào database kiểm tra
  //xà lơ
  if (email === 'khanhnqse19@gmail.com' && password === 'weArePeidTeam') {
    res.status(200).json({
      message: `login success`,
      data: {
        fname: `Điệp`,
        yob: 1999
      }
    })
  } else {
    res.status(401).json({
      message: 'Invalid email or password'
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  //gọi database, tạo user từ email và password lưu vào collection users
  try {
    const result = await usersServices.register({
      email,
      password
    })
    res.status(201).json({
      message: 'Register success!',
      data: result
    })
  } catch (error) {
    res.status(422).json({
      message: 'Register failed',
      error: error
    })
  }
}
