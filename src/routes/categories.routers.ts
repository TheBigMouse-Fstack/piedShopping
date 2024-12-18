import express from 'express'
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController
} from '~/controllers/categories.controllers'
import { createCategoriesValidator } from '~/middlewares/categories.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const categoryRouter = express.Router()

/*
    Description: Create a new category
    path: categories/create
    method: POST
    header: {Authorization: 'Bearer <access_token>'}
    body: {
        name: string
        desc: string
    } 
*/
categoryRouter.post('/', accessTokenValidator, createCategoriesValidator, wrapAsync(createCategoryController))

/*
    Description: Get category by id
    path: categories/:id
    method: GET
*/

categoryRouter.get('/:id', wrapAsync(getCategoryByIdController))

/*
    Description: Get all categories
    path: categories/
    method: GET
*/
categoryRouter.get('/', wrapAsync(getAllCategoriesController))

export default categoryRouter
