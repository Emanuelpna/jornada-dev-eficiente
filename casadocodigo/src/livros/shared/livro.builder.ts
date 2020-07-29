import { EntityManager } from 'typeorm';
const assert = require('assert').strict;
import { HttpException, HttpStatus } from '@nestjs/common';

import { LivroEntity } from './livro.entity';
import NovoLivroRequest from './livro.request';
import { AutorEntity } from 'src/autores/shared/autor.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';

export class LivroBuilder {
  async entityFromRequest(
    novoLivro: NovoLivroRequest,
    entityManager: EntityManager,
  ): Promise<LivroEntity> {
    const categoria = await entityManager.findOne(CategoriaEntity, novoLivro.categoriaID);

    assert(
      categoria !== undefined,
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ['Não foi encontrado nenhuma Categoria para o id fornecido'],
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );

    const autor = await entityManager.findOne(AutorEntity, novoLivro.autorID);

    assert(
      autor !== undefined,
      new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            'Não foi encontrado nenhuma pessoa Autora para o id fornecido',
          ],
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      ),
    );

    const livro = new LivroEntity();

    livro.titulo = novoLivro.titulo;
    livro.resumo = novoLivro.resumo;
    livro.sumario = novoLivro.sumario;
    livro.preco = novoLivro.preco;
    livro.numeroPaginas = novoLivro.numeroPaginas;
    livro.isbn = novoLivro.isbn;
    livro.dataPublicacao = novoLivro.dataPublicacao;

    livro.categoria = categoria;
    livro.autor = autor;

    return livro;
  }
}
