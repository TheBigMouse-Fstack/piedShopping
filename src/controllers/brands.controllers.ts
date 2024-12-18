import { NextFunction, Request, Response } from 'express'
import { CreateBrandReqBody, getBrandReqParams } from '~/models/requests/brands.request'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload } from '~/models/requests/users.request'
import brandsServices from '~/services/brands.services'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { BRANDS_MESSAGE, USERS_MESSAGES } from '~/constants/messages'

export const createBrandController = async (
  req: Request<ParamsDictionary, any, CreateBrandReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const isAdmin = await brandsServices.isAdmin(user_id)
  if (!isAdmin) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.FORBIDDEN,
      message: USERS_MESSAGES.USER_IS_NOT_ADMIN
    })
  }
  const brand = await brandsServices.createBrand(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: BRANDS_MESSAGE.CREATE_BRAND_SUCCESS, //
    result: brand
  })
}

export const getBrandByIdController = async (
  req: Request<getBrandReqParams>, //
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const brand = await brandsServices.getBrandById(id)
  if (!brand) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.NOT_FOUND,
      message: BRANDS_MESSAGE.BRAND_NOT_FOUND
    })
  }
  res.json({
    message: BRANDS_MESSAGE.GET_BRAND_BY_ID_SUCCESS,
    result: brand
  })
}

export const getAllBrandController = async (
  req: Request, //
  res: Response,
  next: NextFunction
) => {
  const brands = await brandsServices.getAllBrands()
  res.json({
    message: BRANDS_MESSAGE.GET_ALL_BRANDS_SUCCESS,
    result: brands
  })
}
