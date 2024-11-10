import { Request } from 'express'
import { TokenPayload } from './models/requests/users.request'
declare module 'express' {
  interface Request {
    decode_authorization?: TokenPayLoad
    decode_refresh_token?: TokenPayLoad
    decode_email_verify_token?: TokenPayLoad
    decode_forgot_password_token?: TokenPayLoad
  }
}
