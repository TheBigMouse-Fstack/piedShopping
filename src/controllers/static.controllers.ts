import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { filename } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, filename), (error) => {
    if (error) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Image not found' })
    }
  })
}
