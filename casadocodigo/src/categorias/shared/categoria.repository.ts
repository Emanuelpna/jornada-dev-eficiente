import { Repository, EntityRepository } from 'typeorm';

import { CategoriaEntity } from './categoria.entity';

@EntityRepository(CategoriaEntity)
export class CategoriaRepository extends Repository<CategoriaEntity> {
  async getNome(nome: string): Promise<CategoriaEntity> {
    return this.findOne({ nome: nome });
  }
}
