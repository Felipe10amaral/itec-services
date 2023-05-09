import { z } from 'zod'
import usersRepository from '../../repositories/users.repository'
import { UsernameAlreadyExists } from '../../errors/users/usernameAlreadyExists'
import { UserNotFound } from '../../errors/users/userNotFound.error'
import { IUser } from '../../model/usersRoutes.model'
import { compare, hash } from 'bcrypt'
import { InvalidCredentials } from '../../errors/users/invalidCredentials.error'
import { sign } from 'jsonwebtoken'
import { env } from '../../env'
import { EmailAlreadyExists } from '../../errors/users/emailAlreadyExists'

const secretJWT = env.JWT_SECRET

function validatedCreate(user: IUser) {
  const registerSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  const newUser = registerSchema.parse(user)
  return newUser
}

function validatedUpdated(user: Partial<IUser>) {
  const registerSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
  })
  const newUser = registerSchema.parse(user)
  return newUser
}

class UsersServices {
  async create(user: IUser) {
    const newUser = validatedCreate(user)

    const { username, email } = newUser

    const userWithSameUsername = await usersRepository.getUserName(username)

    const userWithSameEmail = await usersRepository.getEmailUser(email)

    if (userWithSameUsername) {
      throw new UsernameAlreadyExists()
    }

    if (userWithSameEmail) {
      throw new EmailAlreadyExists()
    }

    if (newUser.password) {
      newUser.password = await hash(user.password, 10)
    }

    usersRepository.create(newUser)
  }

  async authorization(email: string, password: string) {
    const user = await usersRepository.getEmailUser(email)

    if (!user) {
      throw new UserNotFound()
    }

    const result = await compare(password, user.password)
    if (result) {
      const token = sign({ email: user.password, _id: user._id }, secretJWT, {
        expiresIn: '1h',
      })

      const username = user.username

      const response = {
        username,
        token,
      }
      return response
    } else {
      throw new InvalidCredentials()
    }
  }

  async getAll() {
    const users = await usersRepository.getAll()

    return users
  }

  async getByUser(username: string) {
    const user = await usersRepository.getUserName(username)
    if (!user) {
      throw new UserNotFound()
    }

    return user
  }

  async updateUser(username: string, user: Partial<IUser>) {
    const newUser = await usersRepository.getUserName(username)
    if (!newUser) {
      throw new UserNotFound()
    }
    const userUpdated = validatedUpdated(user)

    const userWithSameUsername = await usersRepository.getUserName(
      userUpdated.username,
    )

    const userWithSameEmail = await usersRepository.getEmailUser(
      userUpdated.email,
    )

    if (userWithSameUsername) {
      throw new UsernameAlreadyExists()
    }

    if (userWithSameEmail) {
      throw new EmailAlreadyExists()
    }

    if (userUpdated.password) {
      userUpdated.password = await hash(userUpdated.password, 10)
    }

    return usersRepository.update(username, userUpdated)
  }

  async deleteUser(username: string) {
    const user = await usersRepository.getUserName(username)

    if (!user) {
      throw new UserNotFound()
    }

    return await usersRepository.remove(username)
  }
}

export default new UsersServices()
