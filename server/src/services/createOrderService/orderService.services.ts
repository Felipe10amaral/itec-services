import { z } from 'zod'
import { IOrderService } from '../../model/orderService.model'
import orderServiceRepository from '../../repositories/orderService.repository'

import { OrderServiceAlreadyExists } from '../../errors/orderServices/orderServicesAlreadyExists.error'
import { OrderServiceNotFound } from '../../errors/orderServices/orderServiceNotFound.error'

function validatedCreated(orderService: object) {
  const registerSchema = z.object({
    numberOS: z.string(),
    name: z.string(),
    telefone: z.string(),
    cpf: z.string(),
    model: z.string(),
    password: z.string(),
    repair: z.string(),
    value: z.coerce.number(),
    status: z.string(),
    exitDate: z.string(),
    guarantee: z.string(),
    createdAt: z.date().default(new Date()),
  })

  const os = registerSchema.parse(orderService)
  return os
}

function validatedUpdated(orderService: Partial<IOrderService>) {
  const registerSchema = z.object({
    numberOS: z.string(),
    name: z.string(),
    telefone: z.string(),
    cpf: z.string(),
    model: z.string(),
    repair: z.string(),
    value: z.coerce.number(),
    guarantee: z.string(),
    createdAt: z.date().default(new Date()),
  })

  const os = registerSchema.parse(orderService)
  return os
}

class OrderServiceServices {
  async getByOrder(numberOS: string) {
    const os = await orderServiceRepository.getByOneOrder(numberOS)

    if (!os) {
      throw new OrderServiceNotFound()
    }


    return os
  }

  async getAll() {
    const response = await orderServiceRepository.getAll()
    if (!response) {
      throw new OrderServiceNotFound()
    }

    return response
  }

  async create(orderService: object) {
    const os = validatedCreated(orderService)
    const { numberOS } = os

    const orderServiceWithSameNumberOs =
      await orderServiceRepository.getByOneOrder(numberOS)

    if (orderServiceWithSameNumberOs) {
      throw new OrderServiceAlreadyExists()
    }

    await orderServiceRepository.create(os)
  }

  async remove(numberOS: string) {
    const order = await orderServiceRepository.getByOneOrder(numberOS)

    if (!order) {
      throw new OrderServiceNotFound()
    }
    await orderServiceRepository.deleteOne(numberOS)
  }

  async update(numberOS: string, orderService: Partial<IOrderService>) {
    const order = await orderServiceRepository.getByOneOrder(numberOS)
    if (!order) {
      throw new OrderServiceNotFound()
    }
    const os = validatedUpdated(orderService)

    return orderServiceRepository.update(numberOS, os)
  }
}

export default new OrderServiceServices()
