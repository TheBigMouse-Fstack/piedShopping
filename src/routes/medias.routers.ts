import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'

import { wrapAsync } from '~/utils/handlers'
const mediaRouter = Router()

// tạo route với method POST
mediaRouter.post('/upload-image', wrapAsync(uploadImageController))
mediaRouter.post('/upload-video', wrapAsync(uploadVideoController))
export default mediaRouter
