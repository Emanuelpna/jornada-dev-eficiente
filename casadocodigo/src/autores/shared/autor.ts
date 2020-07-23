export class Autor {
  _id: number;
  nome: string;
  email: string;
  descricao: string;
  _dataCriado: Date;

  constructor(nome: string, email: string, descricao: string) {
    this.nome = nome;
    this.email = email;
    this.descricao = descricao;
  }

  set id(id: number) {
    this._id = id;
  }

  set dataCriado(dataCriado: Date) {
    this._dataCriado = dataCriado;
  }
}
