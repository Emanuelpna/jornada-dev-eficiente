import {
  IsNotEmpty,
  Validate,
  Length,
  Min,
  IsDateString,
} from 'class-validator';

import { LivroEntity } from './livro.entity';
import { AutorEntity } from 'src/autores/shared/autor.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';

import { IsUnique } from 'src/validator/IsUnique';
import { IsValidID } from 'src/validator/IsValidID';
import { DateIsFuture } from 'src/validator/DateIsFuture';

export default class NovoLivroRequest {
  @IsNotEmpty()
  @Validate(IsUnique, [{ Entity: LivroEntity, ColumnName: 'titulo' }])
  titulo: string;

  @IsNotEmpty()
  @Length(1, 500)
  resumo: string;

  sumario: string;

  @IsNotEmpty()
  @Min(20)
  preco: number;

  @IsNotEmpty()
  @Min(100)
  numeroPaginas: number;

  @IsNotEmpty()
  isbn: number;

  @IsDateString()
  @Validate(DateIsFuture)
  dataPublicacao: Date;

  @IsNotEmpty()
  @Validate(IsValidID, [CategoriaEntity, 'CategoriaID'])
  categoriaID: number;

  @IsNotEmpty()
  @Validate(IsValidID, [AutorEntity, 'AutorID'])
  autorID: number;
}
