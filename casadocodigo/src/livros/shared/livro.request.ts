import {
  IsNotEmpty,
  Validate,
  Length,
  Min,
  IsDateString,
  IsPositive,
} from 'class-validator';

import { Livro } from './livro.entity';
import { Autor } from 'src/autores/shared/autor.entity';
import { Categoria } from 'src/categorias/shared/categoria.entity';

import { IsUnique } from 'src/validator/IsUnique';
import { IsValidID } from 'src/validator/IsValidID';
import { IsFuture } from 'src/validator/IsFuture';

export class NovoLivroRequest {
  @IsNotEmpty()
  @Validate(IsUnique, [{ Entity: Livro, ColumnName: 'titulo' }])
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
  @Validate(IsValidID, [{ Entity: Categoria, ColumnName: 'CategoriaID' }])
  categoriaID: number;

  @IsNotEmpty()
  @Validate(IsValidID, [{ Entity: Autor, ColumnName: 'AutorID' }])
  autorID: number;
}
