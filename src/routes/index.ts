import { Router } from 'express'
import usersRoutes from './api/users.routes'
import productRoutes from './api/products.routes'
import orderRoutes from './api/order.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)

export default routes
