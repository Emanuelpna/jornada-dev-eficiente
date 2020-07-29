import { Repository, getManager, EntityManager } from 'typeorm';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LivroEntity } from './shared/livro.entity';
import NovoLivroRequest from './shared/livro.request';
import { LivroBuilder } from './shared/livro.builder';

@Controller('livros')
export class LivrosController {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
  ) {
    this.entityManager = getManager();
  }

  @Post()
  async saveLivro(@Body() novoLivro: NovoLivroRequest): Promise<LivroEntity> {
    const livroBuilder = new LivroBuilder();
    const livro = await livroBuilder.entityFromRequest(
      novoLivro,
      this.entityManager,
    );

    const livroSalvado = await this.livroRepository.save(livro);

    return livroSalvado;
  }
}
