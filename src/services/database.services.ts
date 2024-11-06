import { log } from 'console'
import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/Userschema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
dotenv.config() // kích hoạt liên kết với .env
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcardcluster.n1waq.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingCardCluster`

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      log(error)
      throw error
    }
  }
  // lấy collection users về
  //accessor property
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}

//tạo instance
const databaseServices = new DatabaseServices()
export default databaseServices
