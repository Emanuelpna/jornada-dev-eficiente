import { strict as assert } from 'assert';
import { EntityManager } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { Livro } from './livro.entity';
import { NovoLivroRequest } from './livro.request';
import { Autor } from 'src/autores/shared/autor.entity';
import { Categoria } from 'src/categorias/shared/categoria.entity';

export class LivroBuilder {
  async modelFromRequest(
    novoLivro: NovoLivroRequest,
    entityManager: EntityManager,
  ): Promise<Livro> {
    const categoria = await entityManager.findOne(
      Categoria,
      novoLivro.categoriaID,
    );

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

    const autor = await entityManager.findOne(Autor, novoLivro.autorID);

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

    const livro = new Livro();

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
