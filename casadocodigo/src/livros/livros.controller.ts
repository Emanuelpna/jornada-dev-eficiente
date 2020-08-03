import { strict as assert } from 'assert';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Livro } from './shared/livro.entity';
import { LivroBuilder } from './shared/livro.builder';
import { NovoLivroRequest } from './shared/livro.request';

@Controller('livros')
export class LivrosController {
  // private readonly

  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
  ) {}

  @Get()
  async getLivros(): Promise<Livro[]> {
    const livros = await this.livroRepository.find();

    return livros;
  }

  @Get(':id')
  async getAutor(@Param('id') id: number): Promise<Livro> {
    const livro = await this.livroRepository.findOne(id, {
      relations: ['categoria', 'autor'],
    });

    assert(
      livro !== undefined,
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Não foi encontrado nenhum Livro para o id fornecido'],
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );

    return livro;
  }

  @Post()
  async saveLivro(@Body() novoLivro: NovoLivroRequest): Promise<Livro> {
    const entityManager: EntityManager = getManager();

    const livroBuilder = new LivroBuilder();
    const livro = await livroBuilder.modelFromRequest(
      novoLivro,
      entityManager,
    );

    const livroSalvado = await this.livroRepository.save(livro);

    return livroSalvado;
  }
}
