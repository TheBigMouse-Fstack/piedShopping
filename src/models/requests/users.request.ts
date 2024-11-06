import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

//file này lưu các request mà người dùng gửi lên
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  TokenType: TokenType
}

export interface logoutReqBody {
  refresh_token: string
}
