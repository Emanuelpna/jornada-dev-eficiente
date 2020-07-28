import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getManager, EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'IsValidID', async: true })
export class IsValidID implements ValidatorConstraintInterface {
  private readonly entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async validate(
    value: unknown,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const Entity = validationArguments.constraints[0];

    const autorComMesmoNome = await this.entityManager.findOne(Entity, {
      id: value,
    });

    if (autorComMesmoNome) {
      return true;
    }

    return false;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const columnName: string = validationArguments.constraints[1];

    return `Não foi encontrado nenhum registro para ${columnName}`;
  }
}
