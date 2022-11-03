import { Router, Request, Response } from 'express'
import * as controllers from '../../controllers/order.controller'
import * as productscontroller from '../../controllers/order-products.controller'
import authMiddleware from '../../middleware/authentication'

const routes = Router()

routes
  .route('/')
  .get(authMiddleware, controllers.getMany)
  .post(authMiddleware, controllers.create)
routes
  .route('/:id')
  .get(authMiddleware, controllers.getOne)
  .patch(authMiddleware, controllers.updateOne)
  .delete(authMiddleware, controllers.deleteOne)

//order products routes
routes
  .route('/:id/products')
  .post(authMiddleware, productscontroller.addProduct)
  .get(authMiddleware, productscontroller.getProducts)
  .delete(authMiddleware, productscontroller.deleteProduct)

export default routes
