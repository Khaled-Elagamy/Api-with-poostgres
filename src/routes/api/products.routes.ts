import { Router, Request, Response } from 'express'
import * as controllers from '../../controllers/products.controller'
import authMiddleware from '../../middleware/authentication'

const routes = Router()

routes
  .route('/')
  .get(controllers.getMany)
  .post(authMiddleware, controllers.create)
routes
  .route('/:id')
  .get(controllers.getOne)
  .patch(authMiddleware, controllers.updateOne)
  .delete(authMiddleware, controllers.deleteOne)

export default routes
