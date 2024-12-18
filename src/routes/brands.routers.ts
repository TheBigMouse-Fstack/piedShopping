import express from 'express'
import { createBrandController, getAllBrandController, getBrandByIdController } from '~/controllers/brands.controllers'
import { createBrandValidator } from '~/middlewares/brands.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const brandRouter = express.Router()

/* desc : create a brand
method: POST
path: /brands/
headers: { 
Authorization: 'Bearer <access_token>'
}
body: { name, hotline, address }
*/

brandRouter.post(
  '/',
  accessTokenValidator, //
  createBrandValidator,
  wrapAsync(createBrandController)
)

/* desc : get info a brand
method: GET
path: /brands/:id
*/
brandRouter.get('/:id', wrapAsync(getBrandByIdController))

/* desc : get all brand
method: GET
path: /brands/
*/
brandRouter.get('/', wrapAsync(getAllBrandController))

export default brandRouter
