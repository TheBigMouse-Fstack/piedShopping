import { NextFunction, Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import mediasServices from '~/services/medias.services'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  //   console.log(__dirname) : cung cấp đường dẫn đến thư mục chưa sfile
  //   console.log(path.resolve('uploads')) cung cấp đường dẫn bắt đầu tính từ thư mục
  // dự án đang hướng về upload ko tồn tại
  // đây là đường dẫn mơ mà mình muốn lưu trữ hình ảnh
  // tạo một tấm lưới lọc file bằng formidable
  const url = await mediasServices.handleUploadImage(req)
  res.status(HTTP_STATUS.OK).json({ message: 'Upload  image successfully', url })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  //   console.log(__dirname) : cung cấp đường dẫn đến thư mục chưa sfile
  //   console.log(path.resolve('uploads')) cung cấp đường dẫn bắt đầu tính từ thư mục
  // dự án đang hướng về upload ko tồn tại
  // đây là đường dẫn mơ mà mình muốn lưu trữ hình ảnh
  // tạo một tấm lưới lọc file bằng formidable
  const url = await mediasServices.handleUploadVideo(req)
  res.status(HTTP_STATUS.OK).json({ message: 'Upload video successfully', url })
}
