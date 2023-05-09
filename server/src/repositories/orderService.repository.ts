import { IOrderService, OrderService } from '../model/orderService.model'

// interface Props extends Document {
//   numberOS: string
//   name: string
//   telefone: string
//   cpf: string
//   model: string
//   repair: string
//   value: number
//   guarantee: string
//   createdAt?: string
// }

class OrderServiceRepository {
  async create(orderService: IOrderService) {
    const os = await OrderService.create(orderService)
    return os
  }

  async getAll() {
    const os = await OrderService.find()
    return os
  }

  async getByOneOrder(numberOS: string) {
    return await OrderService.findOne({ numberOS })
  }

  async update(numberOS: string, orderService: Partial<IOrderService>) {
    return await OrderService.updateOne({ numberOS }, { $set: orderService })
  }

  async deleteOne(numberOS: string) {
    return await OrderService.deleteOne({ numberOS })
  }
}

export default new OrderServiceRepository()
