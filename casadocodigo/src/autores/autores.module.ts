import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import { Autor } from './shared/autor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  controllers: [AutoresController],
})
export class AutoresModule {}
