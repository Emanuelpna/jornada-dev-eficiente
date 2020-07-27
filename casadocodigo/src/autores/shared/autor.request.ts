import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';
import { UniqueEmail } from './UniqueEmail';

export class NovoAutorRequest {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueEmail)
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
