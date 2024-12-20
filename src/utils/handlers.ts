import { NextFunction, Request, Response, RequestHandler } from 'express'
// file naỳ chứa wrapAsync
// wrapAsync là 1 hàm nhận vào `async request handler`
// `async request handler` là handler đang ko có try catch next
// wrapAsync nhận vào `async request handler` này vào
// trả về request handler mới
// có cấu trúc try catch next và chạy `async request handler` cũ trong cấu trúc đó

export const wrapAsync = (func: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error: any) {
      if (error.message.includes('network') || error.message.includes('ENOTFOUND')) {
        // Kiểm tra lỗi có liên quan đến mất mạng hay không
        res.status(503).json({ message: 'Mất kết nối mạng. Vui lòng kiểm tra kết nối WiFi và thử lại.' })
      } else {
        next(error)
      }
    }
  }
}
