import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { Media } from '../Other'

export interface CreateProductReqBody {
  name: string
  quantity: number
  price: number
  description: string
  brand_id: ObjectId
  origin: string
  volume: number
  weight: number
  height: number
  width: number
  category_id: ObjectId
  ship_category_id: ObjectId
  medias: Media[]
}

export interface GetProductReqParams extends ParamsDictionary {
  id: string
}

export interface getAllProductsByPageReqParams extends ParamsDictionary {
  page: string
  limit: string
}
