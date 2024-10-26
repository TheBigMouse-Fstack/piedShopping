import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const userRouter = express.Router()

// Route đăng nhập
userRouter.post('/login', loginValidator, loginController)

// Route đăng ký
/*
desc: Resgister new user
path: /register
method: POST
body:{
    name: string
    email: string
    password: string
    confirm_password: string
    date_of_birth: String có dạng ISO 8601
    }
*/
userRouter.post('/register', registerValidator, registerController)

export default userRouter
