import mongoose, { Schema } from 'mongoose'

export interface IOrderService {
  numberOS: string
  name: string
  telefone: string
  cpf: string
  model: string
  repair: string
  value: number
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

  repair: {
    type: String,
  },

  value: {
    type: Number,
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
