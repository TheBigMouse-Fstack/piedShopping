import express, { Router } from 'express'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { serveImageController } from '~/controllers/static.controllers'
import { wrapAsync } from '~/utils/handlers'

const staticRouter = Router()

// staticRouter.use('/image/', express.static(UPLOAD_IMAGE_DIR))
staticRouter.get('/image/:filename', wrapAsync(serveImageController))
// filename: param

export default staticRouter
