import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getManager, EntityManager, ObjectType } from 'typeorm';

@ValidatorConstraint({ name: 'IsUnique', async: true })
export class IsUnique implements ValidatorConstraintInterface {
  private readonly entityManager: EntityManager;

  constructor() {
    this.entityManager = getManager();
  }

  async validate(
    value: unknown,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const GenericRepository: ObjectType<unknown> =
      validationArguments.constraints[0];

    const columnName: string = validationArguments.constraints[1];

    const autorComMesmoNome = await this.entityManager.findOne(
      GenericRepository,
      { [columnName]: value },
    );

    if (autorComMesmoNome) {
      return false;
    }

    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const columnName: string = validationArguments.constraints[1];

    return `${columnName} precisa ser único`;
  }
}
