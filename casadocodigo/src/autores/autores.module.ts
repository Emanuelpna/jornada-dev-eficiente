import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import AutorEntity from './shared/autor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AutorEntity])],
  controllers: [AutoresController],
  providers: [],
})
export class AutoresModule {}
