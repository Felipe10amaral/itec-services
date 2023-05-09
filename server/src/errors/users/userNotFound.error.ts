export class UserNotFound extends Error {
  constructor() {
    super()
    this.message = 'Usuário não encontrado'
  }
}
