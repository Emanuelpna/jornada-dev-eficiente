import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';

import { IsUnique } from 'src/validator/IsUnique';
import AutorEntity from './autor.entity';

export class NovoAutorRequest {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUnique, [AutorEntity, 'email'])
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
