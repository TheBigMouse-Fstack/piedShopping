// viết hàm kiểm tra thư mục dự án có folder uploads không
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { Request } from 'express'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'

// nếu chưa có thì tạo
export const initFolder = () => {
  // kiểm tra xem uploadsFolderPath có đưa mình đến folder nào ko
  if (!fs.existsSync(UPLOAD_IMAGE_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_IMAGE_TEMP_DIR, { recursive: true })
  }
}

//handleUploadSingleImage: hàm nhận vào req
// ép req đi qua lưới lọc formidable
// và trả ra các file ảnh thỏa đk
// gọi hàm này , bỏ req vào và nhận đc các ảnh
export const handlerUploadImage = (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 4, // tối đa 1 ảnh
    maxFileSize: 300 * 1024, // 300kb
    maxTotalFileSize: 300 * 1024 * 4, // 1200kb
    keepExtensions: true, // giữ lại đuôi của file
    filter: ({ name, originalFilename, mimetype }) => {
      // name là tên của file chứa file
      // originalFilename la ten gốc của file
      // mimetype là loại file (image/jpeg, image/png)
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid // chắc chắn là true
    }
  })
  // dùng cái lưới này để lọc file trong req
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      if (!files.image) return reject(new Error('Image is empty'))
      return resolve(files.image)
    })
  })
}

// làm lấy tên của file và bỏ qua Extension
// ádas.png => asdas
export const getNameFormFullnameFile = (fileName: string) => {
  // ví dụ filename là sang.anh1.png => sang-anh1
  const nameArr = fileName.split('.')
  nameArr.pop() // xóa phần tử cuối cùng, tốc là xóa đuôi .png
  return nameArr.join('-')
}
