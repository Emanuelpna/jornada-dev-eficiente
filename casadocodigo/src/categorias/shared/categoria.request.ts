import { IsNotEmpty, Validate } from 'class-validator';

import { IsUnique } from 'src/validator/IsUnique';
import { CategoriaEntity } from './categoria.entity';

export class NovaCategoriaRequest {
  @IsNotEmpty()
  @Validate(IsUnique, [CategoriaEntity, 'nome'])
  nome: string;
}
