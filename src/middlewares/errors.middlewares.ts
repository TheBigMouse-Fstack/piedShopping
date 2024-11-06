import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
// file này chứa hàm xử lý lỗi của toàn bộ sv
// Lội của valiadate trả về sec có các dạng sao
// EntityError {status,message,errors}
// ErrorWithStatus {status,message}
// lỗi của controller trả về ErrorWithStatus
// error bth {message,stack,name}
// Lỗi từ mỗi nơi đổ về đây chưa chắc có status
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, 'status'))
  } else {
    Object.getOwnPropertyNames(error).forEach((key) => {
      Object.defineProperty(error, key, { enumerable: true })
    })
    //
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.errorMessage,
      errorInfor: omit(error, ['stack'])
    })
  }
}
