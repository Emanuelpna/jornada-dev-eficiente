import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getCustomRepository } from 'typeorm';

import { AutorRepository } from './autor.repository';

@ValidatorConstraint({ name: 'UniqueEmail', async: true })
export class UniqueEmail implements ValidatorConstraintInterface {
  private readonly autorRepository: AutorRepository;

  constructor() {
    this.autorRepository = getCustomRepository(AutorRepository);
    this.autorRepository.create();
  }

  async validate(email: string): Promise<boolean> {
    const autorComMesmoEmail = await this.autorRepository.getEmail(email);

    if (autorComMesmoEmail) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Email precisa ser único';
  }
}
