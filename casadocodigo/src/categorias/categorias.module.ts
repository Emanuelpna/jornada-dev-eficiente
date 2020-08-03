import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Categoria } from './shared/categoria.entity';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
