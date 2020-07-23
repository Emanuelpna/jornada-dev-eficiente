import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import Autor from './shared/autor.entity';
import { AutorService } from './shared/autor.service';

@Controller('autores')
export class AutoresController {
  constructor(private AutorService: AutorService) {}

  @Get()
  async getAutores(): Promise<Autor[]> {
    return this.AutorService.getAutores();
  }

  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<Autor> {
    return this.AutorService.getAutor(id);
  }

  @Post()
  async saveAutor(@Body() novoAutor: Autor): Promise<Autor> {
    return await this.AutorService.saveAutor(novoAutor);
  }
}
