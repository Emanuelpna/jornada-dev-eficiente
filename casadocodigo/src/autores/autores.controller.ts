import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { Autor } from './shared/autor';
import AutorEntity from './shared/autor.entity';
import { AutorRequest } from './shared/autor.request';

// Carga Intrínseca = 3 (Autor, AutorEntity, NovoAutorRequest)
@Controller('autores')
export class AutoresController {
  // 1
  @Get()
  async getAutores(): Promise<Autor[]> {
    const autores = await AutorEntity.find();

    return autores.map(autor => autor.toModel());
  }

  // 1
  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<Autor> {
    const autor = await AutorEntity.findOne(id);

    return autor.toModel();
  }

  // 3
  @Post()
  async saveAutor(@Body() novoAutor: AutorRequest): Promise<Autor> {
    const novoAutorValidado = new AutorEntity(
      novoAutor.nome,
      novoAutor.email,
      novoAutor.descricao,
    );

    const autorSalvado = await novoAutorValidado.save();

    return autorSalvado.toModel();
  }
}
