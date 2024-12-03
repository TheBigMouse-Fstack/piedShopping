import { Router } from 'express'
import { serveImageController, serveVideoController } from '~/controllers/static.controllers'
import { wrapAsync } from '~/utils/handlers'

const staticRouter = Router()

// staticRouter.use('/image/', express.static(UPLOAD_IMAGE_DIR))
staticRouter.get('/image/:filenam   e', wrapAsync(serveImageController))
staticRouter.get('/video/:filename', wrapAsync(serveVideoController))
// filename: param

export default staticRouter
