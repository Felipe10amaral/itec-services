import { IUser, Users } from '../model/usersRoutes.model'

class UsersServices {
  async create(user: IUser) {
    await Users.create(user)
  }

  async getAll() {
    const users = await Users.find()
    return users
  }

  async getEmailUser(email: string) {
    const getEmail = await Users.findOne({ email })
    return getEmail
  }

  async getUserName(username: string) {
    return await Users.findOne({ username })
  }

  async remove(username: string) {
    return await Users.deleteOne({ username })
  }

  async update(username: string, newUser: Partial<IUser>) {
    return await Users.updateOne({ username }, { $set: newUser })
  }
}

export default new UsersServices()
