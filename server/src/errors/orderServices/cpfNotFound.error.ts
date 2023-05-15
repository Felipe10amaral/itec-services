export class CpfNotFound extends Error {
  constructor() {
    super()
    this.message = 'Não possui os com este cpf'
  }
}
