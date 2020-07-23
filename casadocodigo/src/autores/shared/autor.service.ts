import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import Autor from './autor.entity';

@Injectable()
export class AutorService {
  async getAutores(): Promise<Autor[]> {
    return await Autor.find();
  }

  async getAutor(id: number): Promise<Autor> {
    return await Autor.findOne(id);
  }

  async saveAutor(autor: Autor): Promise<Autor> {
    this._validaRequisicao(autor);

    return await Autor.save(autor);
  }

  async updateAutor(id: number, autorAtualizado: Autor): Promise<Autor> {
    this._validaRequisicao(autorAtualizado);

    await Autor.update({ id }, autorAtualizado);

    return await Autor.findOne({ id });
  }

  async deleteAutor(id: number): Promise<Autor> {
    const autorASerDeletado = await Autor.findOne({ id });

    return await autorASerDeletado.remove();
  }

  private _validaRequisicao(autor: Autor) {
    if (
      !autor.email ||
      !autor.nome ||
      !autor.descricao ||
      autor.descricao.length > 400
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Todos os campos devem estar preenchidos',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isEmailValido = this._validateEmail(autor.email);

    if (!isEmailValido) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email precisa estar em um formato válido',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private _validateEmail(email: string): boolean {
    // Validação retirada de: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
