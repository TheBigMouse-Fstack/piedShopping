import { log } from 'console'
import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/Userschema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'

// Kích hoạt liên kết với .env để truy cập các biến môi trường
dotenv.config()

// Tạo URI kết nối với MongoDB dựa trên thông tin từ .env
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcardcluster.n1waq.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingCardCluster`

class DatabaseServices {
  private client: MongoClient
  private db: Db

  // Khởi tạo client và db sử dụng URI và tên DB từ .env
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  // Phương thức kết nối tới MongoDB và kiểm tra kết nối bằng lệnh ping
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      log(error)
      throw error
    }
  }

  // Lấy collection users từ DB, sử dụng accessor property
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  // Lấy collection refreshTokens từ DB, sử dụng accessor property
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}

// Tạo instance của DatabaseServices
const databaseServices = new DatabaseServices()
export default databaseServices
