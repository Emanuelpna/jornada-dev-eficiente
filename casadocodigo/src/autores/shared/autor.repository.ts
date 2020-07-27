import { Repository, EntityRepository } from 'typeorm';

import AutorEntity from './autor.entity';

@EntityRepository(AutorEntity)
export class AutorRepository extends Repository<AutorEntity> {
  async getEmail(email: string): Promise<AutorEntity> {
    return await this.findOne({ email: email });
  }
}
