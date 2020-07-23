import { Module } from '@nestjs/common';
import { AutoresController } from './autores.controller';

@Module({
  controllers: [AutoresController],
  providers: []
})
export class AutoresModule {}
