import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import AutorEntity from './shared/autor.entity';
import { NovoAutorRequest } from './shared/autor.request';

// Carga Intrínseca = 2 (AutorEntity, NovoAutorRequest)
@Controller('autores')
export class AutoresController {
  constructor(
    @InjectRepository(AutorEntity)
    private autorRepository: Repository<AutorEntity>,
  ) {}

  // 1
  @Get()
  async getAutores(): Promise<AutorEntity[]> {
    const autores = await this.autorRepository.find();

    return autores;
  }

  // 1
  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<AutorEntity> {
    const autor = await this.autorRepository.findOne(id);

    return autor;
  }

  // 2
  @Post()
  async saveAutor(@Body() novoAutor: NovoAutorRequest): Promise<AutorEntity> {
    const novoAutorValidado = new AutorEntity(
      novoAutor.nome,
      novoAutor.email,
      novoAutor.descricao,
    );

    const autorSalvado = await this.autorRepository.save(
      novoAutorValidado,
    );

    return autorSalvado;
  }
}
