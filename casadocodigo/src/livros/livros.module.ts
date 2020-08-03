import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Livro } from './shared/livro.entity';
import { LivrosController } from './livros.controller';
import { Autor } from 'src/autores/shared/autor.entity';
import { Categoria } from 'src/categorias/shared/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livro, Categoria, Autor]),
  ],
  controllers: [LivrosController],
})
export class LivrosModule {}
