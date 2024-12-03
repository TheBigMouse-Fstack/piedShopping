// Import required libraries
import { log } from 'console'
import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/Userschema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'

// Load environment variables from the .env file
dotenv.config()

/**
 * Construct the MongoDB connection URI using environment variables:
 * - DB_USERNAME: MongoDB username
 * - DB_PASSWORD: MongoDB password
 */
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@shoppingcardcluster.n1waq.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingCardCluster`

/**
 * DatabaseServices
 * This class is responsible for managing the connection to MongoDB
 * and accessing specific collections.
 */
class DatabaseServices {
  // Private properties for managing the database client and instance
  private client: MongoClient // Manages the MongoDB connection
  private db: Db // Represents a specific database instance

  /**
   * Constructor
   * - Initializes the MongoClient with the connection URI.
   * - Assigns the database instance using the name from the environment variable DB_NAME.
   */
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME) // Automatically creates the database if it doesn't exist
  }

  /**
   * connect
   * - Establishes a connection to MongoDB and verifies the connection.
   * - Uses the `ping` command to check the deployment status.
   * @throws {Error} - If the connection fails.
   */
  async connect() {
    try {
      await this.db.command({ ping: 1 }) // Use `ping` to test the connection
      log('Pinged your deployment. Successfully connected to MongoDB!')
    } catch (error) {
      log('Error connecting to MongoDB:', error)
      throw error // Re-throw the error to be handled elsewhere
    }
  }

  /**
   * users (getter)
   * - Provides access to the `users` collection in the database.
   * - The collection name is sourced from the environment variable DB_USERS_COLLECTION.
   */
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  /**
   * refreshTokens (getter)
   * - Provides access to the `refreshTokens` collection in the database.
   * - The collection name is sourced from the environment variable DB_REFRESH_TOKENS_COLLECTION.
   */
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  //create index
  async createIndexes() {
    const exist = await this.users.indexExists(['_id_', 'username_1', 'email_1_password_1'])
    if (!exist) {
      await this.users.createIndex({ username: 1 }, { unique: true })
      await this.users.createIndex({ email: 1 }, { unique: true })
      await this.users.createIndex({ email: 1, password: 1 })
    }
  }
  async createIndexRefreshTokens() {
    const exist = await this.users.indexExists(['_id_', 'token_1', 'exp_1'])
    if (!exist) {
      await this.refreshTokens.createIndex({ token: 1 }, { unique: true })
      // TTL index
      await this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
    }
  }
}
// mongooes / odm / orm / prisma
// Create and export a shared instance of DatabaseServices
// This instance is used throughout the application
const databaseServices = new DatabaseServices()
export default databaseServices
