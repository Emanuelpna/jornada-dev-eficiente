import {
  IsNotEmpty,
  Validate,
  Length,
  Min,
  IsDateString,
  IsPositive,
} from 'class-validator';

import { LivroEntity } from './livro.entity';
import { AutorEntity } from 'src/autores/shared/autor.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';

import { IsUnique } from 'src/validator/IsUnique';
import { IsValidID } from 'src/validator/IsValidID';
import { IsFuture } from 'src/validator/IsFuture';

export default class NovoLivroRequest {
  @IsNotEmpty()
  @Validate(IsUnique, [{ Entity: LivroEntity, ColumnName: 'titulo' }])
  titulo: string;

  @IsNotEmpty()
  @Length(1, 500)
  resumo: string;

  @IsNotEmpty()
  sumario: string;

  @IsNotEmpty()
  @IsPositive()
  @Min(20)
  preco: number;

  @IsNotEmpty()
  @IsPositive()
  @Min(100)
  numeroPaginas: number;

  @IsNotEmpty()
  isbn: string;

  @IsDateString()
  @Validate(IsFuture)
  dataPublicacao: Date;

  @IsNotEmpty()
  @Validate(IsValidID, [{ Entity: CategoriaEntity, ColumnName: 'CategoriaID' }])
  categoriaID: number;

  @IsNotEmpty()
  @Validate(IsValidID, [{ Entity: AutorEntity, ColumnName: 'AutorID' }])
  autorID: number;
}
