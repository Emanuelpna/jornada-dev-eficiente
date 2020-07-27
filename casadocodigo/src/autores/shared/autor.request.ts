import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class NovoAutorRequest {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(1, 400)
  descricao: string;

  constructor(nome: string, email: string, descricao: string) {
    this.nome = nome;
    this.email = email;
    this.descricao = descricao;
  }
}
