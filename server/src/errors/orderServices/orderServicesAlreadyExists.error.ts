export class OrderServiceAlreadyExists extends Error {
  constructor() {
    super()
    this.message = 'Esta ordem de serviço ja possui cadastro'
  }
}
