import dotenv from 'dotenv'
import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import fs from 'fs'
import { getNameFormFullnameFile, handlerUploadImage, handlerUploadVideo } from '~/utils/file'
import { Media } from '~/models/Other'
import { MediaType } from '~/constants/enums'
dotenv.config()
class MediasServices {
  async handleUploadImage(req: Request) {
    const files = await handlerUploadImage(req) // lấy file trong req
    const result = await Promise.all(
      files.map(async (file) => {
        const newfilename = getNameFormFullnameFile(file.newFilename) + '.jpg'

        const newPath = UPLOAD_IMAGE_DIR + '/' + newfilename

        // nén
        const info = await sharp(file.filepath).jpeg().toFile(newPath)

        // xóa file
        fs.unlinkSync(file.filepath)

        // trả ra link để truy cập
        const url: Media = {
          url: `http://localhost:${process.env.PORT}/static/image/${file.newFilename}`,
          type: MediaType.Image
        }
        return url
      })
    )
    return result
  }
  async handleUploadVideo(req: Request) {
    const files = await handlerUploadVideo(req) // lấy file trong req
    const result = await Promise.all(
      files.map(async (file) => {
        const url: Media = {
          url: `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
          type: MediaType.Video
        }
        return url
      })
    )
    return result
  }
}
const mediasServices = new MediasServices()
export default mediasServices
