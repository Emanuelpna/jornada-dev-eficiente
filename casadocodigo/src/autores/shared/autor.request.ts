import { IsEmail, IsNotEmpty, Length, Validate } from 'class-validator';

import { IsUnique } from 'src/validator/IsUnique';
import { Autor } from './autor.entity';

export class NovoAutorRequest {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsUnique, [{ Entity: Autor, ColumnName: 'email' }])
  email: string;

  @IsNotEmpty()
  @Length(1, 400)
  descricao: string;
}
