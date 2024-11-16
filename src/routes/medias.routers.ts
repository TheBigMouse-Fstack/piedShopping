import { Router } from 'express'
import { uploadImageController } from '~/controllers/medias.controllers'

import { wrapAsync } from '~/utils/handlers'
const mediaRouter = Router()

// tạo route với method POST
mediaRouter.post('/upload-image', wrapAsync(uploadImageController))
export default mediaRouter
