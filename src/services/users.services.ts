import User from '~/models/schemas/Userschema'
import databaseServices from './database.services'
import { RegisterReqbody } from '~/models/schemas/requests/users.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import dotenv from 'dotenv'
dotenv.config()

class UsersServices {
  private signAccessToken(userId: string) {
    return signToken({
      payload: { userId, TokenType: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }

  private signRefreshToken(userId: string) {
    return signToken({
      payload: { userId, TokenType: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }

  async checkEmailExist(email: string) {
    // lên database tìm user đang sở hữu email này nếu có
    const user = await databaseServices.users.findOne({ email })
    return !!user
  }

  async register(payload: RegisterReqbody) {
    // call database and create user from email, password
    //collection users
    const result = await databaseServices.users.insertOne(
      new User({ ...payload, password: hashPassword(payload.password), date_of_birth: new Date(payload.date_of_birth) })
    )
    //Tạo ac và rf
    const userId = result.insertedId.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(userId),
      this.signRefreshToken(userId)
    ])
    return { access_token, refresh_token }
  }
}
// create instance
const usersServices = new UsersServices()
export default usersServices
