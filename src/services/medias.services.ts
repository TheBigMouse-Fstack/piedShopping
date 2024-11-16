import dotenv from 'dotenv'
import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import fs from 'fs'
import { getNameFormFullnameFile, handlerUploadImage } from '~/utils/file'
dotenv.config()
class MediasServices {
  async handleUploadImage(req: Request) {
    const files = await handlerUploadImage(req) // lấy file trong req
    const result = await Promise.all(
      files.map(async (file) => {
        const newFileName = getNameFormFullnameFile(file.newFilename) + '.jpg'

        const newPath = UPLOAD_IMAGE_DIR + '/' + newFileName

        // nén
        const info = await sharp(file.filepath).jpeg().toFile(newPath)

        // xóa file
        fs.unlinkSync(file.filepath)

        // trả ra link để truy cập
        const url = `http://localhost:${process.env.PORT}/static/image/${newFileName}`
        return url
      })
    )
    return result
  }
}
const mediasServices = new MediasServices()
export default mediasServices
