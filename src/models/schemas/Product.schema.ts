import { ObjectId } from 'mongodb'
import { PRODUCT_STATUS } from '~/constants/enums'

interface ProductType {
  _id?: ObjectId
  name: string
  quantity: number
  price: number
  description: string
  rating_number?: number
  brand_id: ObjectId
  origin: string
  volume: number
  weight: number
  height: number
  width: number
  sold?: number
  status?: PRODUCT_STATUS
  category_id: ObjectId
  ship_category_id: ObjectId
}

export default class Product {
  _id?: ObjectId
  name: string
  quantity: number
  price: number
  description: string
  rating_number?: number
  brand_id: ObjectId
  origin: string
  volume: number
  weight: number
  height: number
  width: number
  sold?: number
  status?: PRODUCT_STATUS
  category_id: ObjectId
  ship_category_id: ObjectId
  constructor(product: ProductType) {
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.quantity = product.quantity
    this.price = product.price
    this.description = product.description
    this.rating_number = product.rating_number || 5
    this.brand_id = product.brand_id
    this.origin = product.origin
    this.volume = product.volume
    this.weight = product.weight
    this.height = product.height
    this.width = product.width
    this.sold = product.sold || 0
    this.status = product.status || PRODUCT_STATUS.Active
    this.category_id = product.category_id
    this.ship_category_id = product.ship_category_id
  }
}
