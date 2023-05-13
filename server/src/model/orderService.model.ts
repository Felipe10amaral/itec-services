import mongoose, { Schema } from 'mongoose'

export interface IOrderService {
  numberOS: string
  name: string
  telefone: string
  cpf: string
  model: string
  password: string
  repair: string
  value: number
  status: string
  exitDate: string
  guarantee: string
  createdAt: Date
}

export const OrderServiceSchema = new Schema<IOrderService>({
  numberOS: {
    type: String,
    unique: true,
  },

  name: {
    type: String,
  },

  telefone: {
    type: String,
  },

  cpf: {
    type: String,
  },

  model: {
    type: String,
  },

  password: {
    type: String
  },

  repair: {
    type: String,
  },

  value: {
    type: Number,
  },

  status: {
    type: String
  },

  exitDate: {
    type: String
  },

  guarantee: {
    type: String,
  },

  createdAt: {
    type: Date,
  },
})

export const OrderService = mongoose.model<IOrderService>(
  'OrderService',
  OrderServiceSchema,
)
