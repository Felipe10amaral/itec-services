import { Router, Request, Response } from 'express'
import usersServices from '../services/usersServices/users.services'
import { authorizationMiddleware } from '../middlewares/authorization.middleware'

export const usersRoutes = Router()

usersRoutes.post('/authorization', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await usersServices.authorization(email, password)
    res.status(200).send({ user })
  } catch (error: any) {
    res.status(401).send({ message: error.message })
  }
})

usersRoutes.get(
  '/',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const user = await usersServices.getAll()

    res.status(200).send(user)
  },
)

usersRoutes.post('/', async (req: Request, res: Response) => {
  try {
    await usersServices.create(req.body)
    res.status(201).send({ message: 'usuário criado com sucesso' })
  } catch (error: any) {
    res.status(400).send({ message: error.message })
  }
})

usersRoutes.delete(
  '/:username',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const { username } = req.params

    try {
      await usersServices.deleteUser(username)
      res.status(200).send({ message: 'usuário excluído com sucesso' })
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  },
)

usersRoutes.put(
  '/:username',
  authorizationMiddleware,
  async (req: Request, res: Response) => {
    const { username } = req.params
    const user = req.body

    try {
      await usersServices.updateUser(username, user)
      res.status(204).send({ message: 'Usuário alterado com sucesso' })
    } catch (error: any) {
      res.status(400).send({ message: error.message })
    }
  },
)
