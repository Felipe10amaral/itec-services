import { Router } from 'express'
import { orderServicesRouter } from './orderService.routes'
import { usersRoutes } from './users.routes'

export const routes = Router()

routes.use('/order', orderServicesRouter)
routes.use('/users', usersRoutes)
