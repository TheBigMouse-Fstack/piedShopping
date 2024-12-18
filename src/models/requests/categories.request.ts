import { ParamsDictionary } from 'express-serve-static-core'

export interface CreateCategoryReqBody {
  name: string
  description: string
}

export interface GetCategoryReqParams extends ParamsDictionary {
  id: string
}
