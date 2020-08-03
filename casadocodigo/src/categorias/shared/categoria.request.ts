import { IsNotEmpty, Validate } from 'class-validator';

import { IsUnique } from 'src/validator/IsUnique';
import { Categoria } from './categoria.entity';

export class NovaCategoriaRequest {
  @IsNotEmpty()
  @Validate(IsUnique, [{ Entity: Categoria, ColumnName: 'nome' }])
  nome: string;
}
