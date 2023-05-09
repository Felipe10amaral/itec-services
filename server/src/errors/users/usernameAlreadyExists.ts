export class UsernameAlreadyExists extends Error {
  constructor() {
    super()
    this.message = 'username já está em uso'
  }
}
