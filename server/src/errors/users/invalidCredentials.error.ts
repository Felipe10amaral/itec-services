export class InvalidCredentials extends Error {
  constructor() {
    super()
    this.message = 'Email ou senha incorretos'
  }
}
