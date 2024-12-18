import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { PRODUCTS_MESSAGE, USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
import {
  CreateProductReqBody,
  getAllProductsByPageReqParams,
  GetProductReqParams
} from '~/models/requests/products.request'
import { TokenPayload } from '~/models/requests/users.request'
import productsServices from '~/services/products.services'
import usersServices from '~/services/users.services'

export const createProductController = async (
  req: Request<ParamsDictionary, any, CreateProductReqBody>,
  res: Response,
  next: NextFunction
) => {
  const productInfo = req.body
  const { user_id } = req.decode_authorization as TokenPayload
  const isAdmin = await usersServices.isAdmin(user_id)
  if (!isAdmin) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.FORBIDDEN,
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN
    })
  } else {
    const product = await productsServices.createProduct(productInfo)
    res.status(HTTP_STATUS.CREATED).json({
      message: PRODUCTS_MESSAGE.CREATE_PRODUCT_SUCCESS,
      result: product
    })
  }
}

export const getProductByIdController = async (
  req: Request<GetProductReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  console.log(id)
  const product = await productsServices.getProductById(id)
  res.status(HTTP_STATUS.OK).json({
    message: PRODUCTS_MESSAGE.GET_PRODUCT_BY_ID_SUCCESS,
    result: product
  })
}

export const getAllProductsByPageController = async (
  req: Request<ParamsDictionary, any, any, getAllProductsByPageReqParams>,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query.page)
  const limit = Number(req.query.limit)
  const products = await productsServices.getAllProductsByPage({ page, limit })
  res.status(HTTP_STATUS.OK).json({
    message: PRODUCTS_MESSAGE.GET_ALL_PRODUCTS_BY_PAGE_SUCCESS,
    result: products
  })
}
