import { HttpStatus, HttpException } from '@nestjs/common';

import AutorEntity from './autor.entity';
import { Repository } from 'typeorm';

export class Autor {
  private _id: number;
  public nome: string;
  public email: string;
  public descricao: string;
  private _dataCriado: Date;

  constructor(nome: string, email: string, descricao: string) {
    this.nome = nome;
    this.email = email;
    this.descricao = descricao;
  }

  set id(id: number) {
    this._id = id;
  }

  set dataCriado(dataCriado: Date) {
    this._dataCriado = dataCriado;
  }

  public async checkEmailIsUnique(autorRepository: Repository<AutorEntity>): Promise<boolean> {
    const autorComMesmoEmail = await autorRepository.findOne({ email: this.email });

    if (autorComMesmoEmail) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email precisa ser único',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  toEntity(): AutorEntity {
    return new AutorEntity(this.nome, this.email, this.descricao);
  }
}
