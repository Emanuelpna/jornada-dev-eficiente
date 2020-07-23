import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';
import { AutorService } from './shared/autor.service';

@Module({
  controllers: [AutoresController],
  providers: [AutorService]
})
export class AutoresModule {}
