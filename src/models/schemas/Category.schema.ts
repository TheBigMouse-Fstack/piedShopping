import { ObjectId } from 'mongodb'

interface CategoryType {
  _id?: ObjectId
  name: string
  description: string
}
export default class Category {
  _id?: ObjectId
  name: string
  description: string
  constructor(category: CategoryType) {
    this._id = category._id || new ObjectId()
    this.name = category.name
    this.description = category.description
  }
}
