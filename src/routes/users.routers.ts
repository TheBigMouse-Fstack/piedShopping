import express from 'express'
import {
  changePasswordController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyEmailTokenController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  forgotPassWordTokenValidator,
  forgotPassWordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordTokenValidator,
  updateMeValidator
} from '~/middlewares/users.middlewares'
import {
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  UpdateMeReqBody,
  VerifyEmailReqQuery
} from '~/models/requests/users.request'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { wrapAsync } from '~/utils/handlers'

const userRouter = express.Router()

// ========================== AUTHENTICATION ROUTES ==========================

// Register a new user
// Path: /users/register
// Method: POST
// Body: { name, email, password, confirm_password, date_of_birth }
userRouter.post(
  '/register',
  filterMiddleware<RegisterReqBody>(['email', 'password', 'confirm_password', 'date_of_birth', 'name']),
  registerValidator,
  wrapAsync(registerController)
)

// Login
// Path: /users/login
// Method: POST
// Body: { email, password }
userRouter.post(
  '/login',
  filterMiddleware<LoginReqBody>(['email', 'password']),
  loginValidator,
  wrapAsync(loginController)
)

// Logout
// Path: /users/logout
// Method: POST
// Header: { Authorization: 'Bearer <access_token>' }
// Body: { refresh_token }
userRouter.post(
  '/logout',
  filterMiddleware<LogoutReqBody>(['refresh_token']),
  accessTokenValidator,
  refreshTokenValidator,
  wrapAsync(logoutController)
)

// ========================== EMAIL VERIFICATION ROUTES ==========================

// Verify email
// Path: /users/verify-email
// Method: GET
// Query: { email_verify_token }
userRouter.get(
  '/verify-email',
  filterMiddleware<VerifyEmailReqQuery>(['email_verify_token']),
  emailVerifyTokenValidator,
  wrapAsync(verifyEmailTokenController)
)

// Resend email verification token
// Path: /users/resend-verify-email
// Method: POST
// Header: { Authorization: 'Bearer <access_token>' }
userRouter.post(
  '/resend-verify-email',
  accessTokenValidator, //
  wrapAsync(resendVerifyEmailController)
)

// ========================== PASSWORD RESET ROUTES ==========================

// Forgot password
// Path: /users/forgot-password
// Method: POST
// Body: { email }
userRouter.post(
  '/forgot-password',
  forgotPassWordValidator, //
  wrapAsync(forgotPasswordController)
)

// Verify forgot password token
// Path: /users/verify-forgot-password
// Method: POST
// Body: { forgot_password_token }
userRouter.post(
  '/verify-forgot-password',
  forgotPassWordTokenValidator, //
  wrapAsync(verifyForgotPasswordTokenController)
)

// Reset password
// Path: /users/reset-password
// Method: POST
// Body: { password, confirm_password, forgot_password_token }
userRouter.post(
  '/reset-password',
  forgotPassWordTokenValidator,
  resetPasswordTokenValidator,
  wrapAsync(resetPasswordController)
)

// ========================== USER PROFILE ROUTES ==========================

// Get user profile
// Path: /users/me
// Method: POST
// Header: { Authorization: 'Bearer <access_token>' }
userRouter.post('/me', accessTokenValidator, wrapAsync(getMeController))

// Update user profile
// Path: /users/me
// Method: PATCH
// Header: { Authorization: 'Bearer <access_token>' }
// Body: { name?, date_of_birth?, bio?, location?, website?, username?, avatar?, cover_photo? }
userRouter.patch(
  '/me',
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  accessTokenValidator,
  updateMeValidator,
  wrapAsync(updateMeController)
)

/*
desc: change-password : change-password
Method: PUT
path: /users/change-password
header: { Authorization: 'Bearer <access_token>' }
body: {old_password, password, new_confirm_password}
*/
userRouter.put(
  '/change-password',
  accessTokenValidator, //
  changePasswordValidator,
  wrapAsync(changePasswordController)
)

/*
desc: refresh-token : xin người dùng hết hạn access token thì họ sẽ gửi
 refresh token lên để xin access token và refresh token mới
path: /users/refresh-token
Method: POST
body: {refresh_token : String}
*/
userRouter.post(
  '/refresh-token',
  refreshTokenValidator, //
  wrapAsync(refreshTokenController)
)
export default userRouter
