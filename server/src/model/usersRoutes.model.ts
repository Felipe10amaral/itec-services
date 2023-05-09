import mongoose, { Schema } from 'mongoose'

export interface IUser {
  name: string
  username: string
  email: string
  password: string
}

export const UsersSchema = new Schema<IUser>({
  name: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
})

export const Users = mongoose.model<IUser>('Users', UsersSchema)
