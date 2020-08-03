import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Autor } from './shared/autor.entity';
import { NovoAutorRequest } from './shared/autor.request';

// Carga Intrínseca = 3 (Autor, NovoAutorRequest, Repository<Autor>)
@Controller('autores')
export class AutoresController {
  constructor(
    @InjectRepository(Autor)
    private autorRepository: Repository<Autor>,
  ) {}

  // 1
  @Get()
  async getAutores(): Promise<Autor[]> {
    const autores = await this.autorRepository.find();

    return autores;
  }

  // 1
  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOne(id);

    return autor;
  }

  // 3
  @Post()
  async saveAutor(@Body() novoAutor: NovoAutorRequest): Promise<Autor> {
    const novoAutorValidado = new Autor(
      novoAutor.nome,
      novoAutor.email,
      novoAutor.descricao,
    );

    const autorSalvado = await this.autorRepository.save(novoAutorValidado);

    return autorSalvado;
  }
}
