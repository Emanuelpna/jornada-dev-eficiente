import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutoresModule } from './autores/autores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AutoresModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
