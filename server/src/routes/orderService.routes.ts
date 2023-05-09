import { Router, Request, Response } from 'express'
import orderServices from '../services/createOrderService/orderService.services'
import { authorizationMiddleware } from '../middlewares/authorization.middleware'

export const orderServicesRouter = Router()

orderServicesRouter.get(
  '/',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const os = await orderServices.getAll()

    return res.status(200).send(os)
  },
)

orderServicesRouter.get('/:numberOS', async (req: Request, res: Response) => {
  const { numberOS } = req.params

  try {
    const os = await orderServices.getByOrder(numberOS)
    return res.status(200).send(os)
  } catch (error: any) {
    return res.status(400).send({ message: error.message })
  }
})

orderServicesRouter.post(
  '/',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    try {
      await orderServices.create(req.body)
      return res
        .status(201)
        .send({ message: 'Ordem de serviço cadastrada com sucesso' })
    } catch (error: any) {
      return res.status(400).send({ message: error.message })
    }
  },
)

orderServicesRouter.delete(
  '/:numberOS',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const { numberOS } = req.params
    try {
      await orderServices.remove(numberOS)
      return res
        .status(200)
        .send({ message: 'ordem de serviço excluida com sucesso ' })
    } catch (error) {
      return res.status(404).send({ message: `${error}` })
    }
  },

  orderServicesRouter.put(
    '/:numberOS',
    authorizationMiddleware,
    async (req: Request, res: Response) => {
      const { numberOS } = req.params
      const os = req.body

      try {
        await orderServices.update(numberOS, os)
        return res.status(204).send()
      } catch (error: any) {
        return res.status(406).send({ message: `${error.message}` })
      }
    },
  ),
)
