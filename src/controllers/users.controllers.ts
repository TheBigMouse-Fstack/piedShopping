import { NextFunction, Request, Response } from 'express'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { logoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/users.request'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/mesages'

// controller là hande điều phối các dữ liệu vào đúng các service xử lí
//trính xuất dữ liệu

//controller là nơi xử lý logic , dữ liệu khi đến tầng này phải clean rồi

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//--------------------------------REGISTER_CONTROLLER------------------------------------
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body
  //gọi database, tạo user từ email và password lưu vào collection users
  // kiểm tra email có tồn tại chưa | có ai dùng email này chưa | email có bị trùng ko ?
  const isDup = await usersServices.checkEmailExist(email)
  if (isDup) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY
    })
  }
  const result = await usersServices.register(req.body)
  res.status(201).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    data: result
  })
}

//---------------------------------LOGIN_CONTROLLER---------------------------------------
//DESC: login
// path:users/login
// method : post
// body:{
//   email: string
//   password: string
// }
export const loginController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  // CHECK EMAIL AND PASSWORD => LOOKING FOR USER
  // HAVE USER = SUCCESS
  const { email, password } = req.body
  // FIND IN DATABASE
  const result = await usersServices.login({ email, password })
  //
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

// ------------------------------------Logout--------------------------------
export const logoutController = async (
  req: Request<ParamsDictionary, any, logoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  const { user_id: user_id_ac } = req.decode_authorization as TokenPayload
  const { user_id: user_id_rf } = req.decode_refresh_token as TokenPayload

  if (user_id_ac !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }

  // Check in database
  await usersServices.checkRefreshToken({
    user_id: user_id_rf,
    refresh_token: refresh_token
  })
  await usersServices.logout(refresh_token)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}
