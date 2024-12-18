import { CreateCategoryReqBody } from '~/models/requests/categories.request'
import databaseServices from './database.services'
import Category from '~/models/schemas/Category.schema'
import { ObjectId } from 'mongodb'
import { CATEGORIES_MESSAGE } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

class CategoriesServices {
  async createCategory(category: CreateCategoryReqBody) {
    const categoriesCreated = await databaseServices.categories.insertOne(
      new Category({
        ...category
      })
    )
    return categoriesCreated
  }

  async getCategoryById(id: string) {
    const category = await databaseServices.categories.findOne({ _id: new ObjectId(id) })
    if (!category) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND
      })
    }
    return category
  }

  async getAllCategories() {
    const categories = await databaseServices.categories.find().toArray()
    return categories
  }
}
const categoriesServices = new CategoriesServices()
export default categoriesServices
