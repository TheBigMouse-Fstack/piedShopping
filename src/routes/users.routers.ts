import express from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { wrapAsync } from '~/utils/handlers'

const userRouter = express.Router()

// ---------------------------------------------------LOGIN ROUTE----------------------------------------------
userRouter.post('/login', loginValidator, wrapAsync(loginController))

// ---------------------------------------------------REGISTER ROUTE----------------------------------------------
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
userRouter.post('/register', registerValidator, wrapAsync(registerController))

// ---------------------------------------------------LOGOUT----------------------------------------------
// DESC: Logout
// path: /Logout
// method: POST
// headers{
//     Authorization: 'Bearer <access_token>'
// }
// refesh_token: string

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
/////////////////////////////////
export default userRouter
