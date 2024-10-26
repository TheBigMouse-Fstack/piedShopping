import { ValidationChain, validationResult } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { Request, Response, NextFunction } from 'express'
//hàm validate sẽ nhận vào các checkShema và trả ra middleware xử lí lỗi
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req) // tạo danh sách lỗi cất vào trong request
    const errors = validationResult(req) // lấy danh sach lỗi trong request dưới dạng mảng
    if (errors.isEmpty()) {
      return next()
    } else {
      res.status(422).json({
        message: 'Invalid failed',
        errors: errors.mapped()
      })
    }
  }
}
