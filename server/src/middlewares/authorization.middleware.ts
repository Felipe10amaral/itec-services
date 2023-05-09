import { Response, Request, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { env } from '../env'

const secretJWT = env.JWT_SECRET

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send({ message: 'Acesso negado' })
  }
  const tokenSplited = token.split('Bearer ')

  const decoded = verify(tokenSplited[1], secretJWT)

  if (!decoded) {
    return res.status(401).send({ message: 'Acesso negado' })
  }

  next()
}
