import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LivroEntity } from './shared/livro.entity';
import { LivrosController } from './livros.controller';
import { AutorEntity } from 'src/autores/shared/autor.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LivroEntity, CategoriaEntity, AutorEntity]),
  ],
  controllers: [LivrosController],
})
export class LivrosModule {}
