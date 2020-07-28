import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';

import { CategoriaRepository } from './categoria.repository';

@ValidatorConstraint({ name: 'IsUniqueName', async: true })
export class IsUniqueName implements ValidatorConstraintInterface {
  private readonly categoriaRepository: CategoriaRepository;

  constructor() {
    this.categoriaRepository = getCustomRepository(CategoriaRepository);
    this.categoriaRepository.create();
  }

  async validate(nome: string): Promise<boolean> {
    const autorComMesmoNome = await this.categoriaRepository.getNome(nome);

    if (autorComMesmoNome) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Nome precisa ser único';
  }
}
