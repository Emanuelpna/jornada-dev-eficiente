import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Autor } from './shared/autor';
import AutorEntity from './shared/autor.entity';
import { NovoAutorRequest } from './shared/autor.request';

// Carga Intrínseca = 2 (Autor, NovoAutorRequest)
@Controller('autores')
export class AutoresController {
  constructor(
    @InjectRepository(AutorEntity)
    private autorRepository: Repository<AutorEntity>,
  ) {}

  // 1
  @Get()
  async getAutores(): Promise<Autor[]> {
    const autores = await this.autorRepository.find();

    return autores.map(autor => autor?.toModel());
  }

  // 1
  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOne(id);

    return autor?.toModel();
  }

  // 2
  @Post()
  async saveAutor(@Body() novoAutor: NovoAutorRequest): Promise<Autor> {
    const novoAutorValidado = new Autor(
      novoAutor.nome,
      novoAutor.email,
      novoAutor.descricao,
    );

    const autorSalvado = await this.autorRepository.save(
      novoAutorValidado.toEntity(),
    );

    return autorSalvado.toModel();
  }
}
