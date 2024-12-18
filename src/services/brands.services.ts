import { USER_ROLE } from '~/constants/enums'
import databaseServices from './database.services'
import { ObjectId } from 'mongodb'
import { CreateBrandReqBody } from '~/models/requests/brands.request'
import Brand from '~/models/schemas/Brand.schema'

class BrandsServices {
  async isAdmin(user_id: string) {
    const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id), role: USER_ROLE.Admin })
    return Boolean(user)
  }

  async createBrand(brand: CreateBrandReqBody) {
    const brandInserted = await databaseServices.brands.insertOne(new Brand({ ...brand }))
  }

  async getBrandById(brand_id: string) {
    const brand = await databaseServices.brands.findOne({ _id: new ObjectId(brand_id) })
    return brand
  }

  async getAllBrands() {
    const brands = await databaseServices.brands.find().toArray()
    return brands
  }
}

const brandsServices = new BrandsServices()
export default brandsServices
