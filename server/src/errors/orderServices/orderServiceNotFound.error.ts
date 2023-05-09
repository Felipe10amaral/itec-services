export class OrderServiceNotFound extends Error {
  constructor() {
    super()
    this.message = 'Ordem de serviço não encontrada'
  }
}
