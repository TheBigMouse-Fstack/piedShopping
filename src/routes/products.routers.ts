import express from 'express'
import {
  createProductController,
  getAllProductsByPageController,
  getProductByIdController
} from '~/controllers/products.controllers'
import { createProductValidator } from '~/middlewares/products.middlewares'
import { accessTokenValidator, idMongoParamValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const productRouter = express.Router()
/*
    Description: Create a new product
    path: products/
    method: POST
    header: {Authorization: 'Bearer <access_token>'}
    body: {
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
        media: string[] 
    }
*/

productRouter.post(
  '/',
  accessTokenValidator, //
  createProductValidator,
  wrapAsync(createProductController)
)

/*
    Description: Get product by id
    path: products/:id
    method: GET
*/
productRouter.get('/:id', idMongoParamValidator, wrapAsync(getProductByIdController))

/*
    Description: Get all products with pagination
    path: products/?page&limit
    method: GET
*/
productRouter.get('/', wrapAsync(getAllProductsByPageController))
export default productRouter
