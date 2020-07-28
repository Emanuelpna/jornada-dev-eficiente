import { Repository } from 'typeorm';
import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import NovoLivroRequest from './shared/livro.request';
import { LivroEntity } from './shared/livro.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';
import { AutorEntity } from 'src/autores/shared/autor.entity';

@Controller('livros')
export class LivrosController {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,

    @InjectRepository(AutorEntity)
    private readonly autorRepository: Repository<AutorEntity>,

    @InjectRepository(LivroEntity)
    private readonly livroRepository: Repository<LivroEntity>,
  ) {}

  @Post()
  async saveLivro(@Body() novoLivro: NovoLivroRequest): Promise<LivroEntity> {
    console.log('novoLivro :>> ', novoLivro);

    const categoria = await this.categoriaRepository.findOneOrFail(
      novoLivro.categoriaID,
    );

    const autor = await this.autorRepository.findOneOrFail(novoLivro.autorID);

    const livro = new LivroEntity();
    livro.fromRequest(novoLivro, categoria, autor);

    console.log('livro :>> ', livro);

    const livroSalvado = await this.livroRepository.save(livro);

    return livroSalvado;
  }
}
