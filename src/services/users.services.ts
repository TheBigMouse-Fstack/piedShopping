import User from '~/models/schemas/Userschema'
import databaseServices from './database.services'
import { register } from 'module'

class UsersServices {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload

    // call database and create user from email, password
    //collection users
    const result = await databaseServices.users.insertOne(
      new User({
        email,
        password
      })
    )
    return result
  }
}
// create instance
const usersServices = new UsersServices()
export default usersServices
