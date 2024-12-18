import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/users.request'
import usersServices from '~/services/users.services'
import { ErrorWithStatus } from '~/models/Errors'
import { CATEGORIES_MESSAGE, USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import categoriesServices from '~/services/categories.services'
import { CreateCategoryReqBody, GetCategoryReqParams } from '~/models/requests/categories.request'

export const createCategoryController = async (
  req: Request<ParamsDictionary, any, CreateCategoryReqBody>,
  res: Response,
  next: NextFunction
) => {
  // admin only
  // is admin
  const { user_id } = req.decode_authorization as TokenPayload
  const isAdmin = await usersServices.isAdmin(user_id)
  if (!isAdmin) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.FORBIDDEN,
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN
    })
  }
  // create categories
  const category = await categoriesServices.createCategory(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: CATEGORIES_MESSAGE.CREATE_CATEGORY_SUCCESS,
    result: category
  })
}

export const getCategoryByIdController = async (
  req: Request<GetCategoryReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const category = await categoriesServices.getCategoryById(id)
  res.json({
    message: CATEGORIES_MESSAGE.GET_CATEGORY_BY_ID_SUCCESS,
    result: category
  })
}

export const getAllCategoriesController = async (
  req: Request<GetCategoryReqParams>,
  res: Response,
  next: NextFunction
) => {
  const categories = await categoriesServices.getAllCategories()
  res.json({
    message: CATEGORIES_MESSAGE.GET_ALL_CATEGORIES_SUCCESS,
    result: categories
  })
}
