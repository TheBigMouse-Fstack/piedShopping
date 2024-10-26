import User from '~/models/schemas/Userschema'
import databaseServices from './database.services'
import { RegisterReqbody } from '~/models/schemas/requests/users.request'

class UsersServices {
  async checkEmailExist(email: string) {
    // lên database tìm user đang sở hữu email này nếu có
    const user = await databaseServices.users.findOne({ email })
    return !!user
  }
  async register(payload: RegisterReqbody) {
    // call database and create user from email, password
    //collection users
    const result = await databaseServices.users.insertOne(
      new User({ ...payload, date_of_birth: new Date(payload.date_of_birth) })
    )
    return result
  }
}
// create instance
const usersServices = new UsersServices()
export default usersServices
