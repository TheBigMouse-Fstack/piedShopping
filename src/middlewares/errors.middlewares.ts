import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

// Hàm này là bộ xử lý lỗi mặc định cho toàn bộ server
// Phân loại các lỗi đầu vào thành hai dạng chính:
// 1. `ErrorWithStatus`: Lỗi có chứa thuộc tính `status`, thường từ controller
// 2. Các lỗi khác: Không có `status`, có thể chứa nhiều thông tin không cần thiết
export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  // Nếu lỗi thuộc kiểu `ErrorWithStatus`, trả về response với `status` cụ thể
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, ['status']))
  } else {
    // Nếu lỗi không phải `ErrorWithStatus`, xử lý và trả về `INTERNAL_SERVER_ERROR`

    // Đảm bảo tất cả các thuộc tính của lỗi có thể liệt kê để lấy thông tin cần thiết
    Object.getOwnPropertyNames(error).forEach((key) => {
      Object.defineProperty(error, key, { enumerable: true })
    })

    // Trả về `500 Internal Server Error` và một số thông tin cơ bản của lỗi
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Internal server error occurred',
      errorInfo: omit(error, ['status'])
    })
  }
}
