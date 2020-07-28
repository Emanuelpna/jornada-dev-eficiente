import { IsNotEmpty, Validate } from 'class-validator';

import { IsUniqueName } from './IsUniqueName';

export class NovaCategoriaRequest {
  @IsNotEmpty()
  @Validate(IsUniqueName)
  nome: string;
}
