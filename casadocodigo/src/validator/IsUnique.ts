import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getManager, EntityManager, ObjectType } from 'typeorm';

interface ValidationProps {
  Entity: ObjectType<unknown>;
  ColumnName: string;
}

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
    const validationProps: ValidationProps = validationArguments.constraints[0];

    const { Entity, ColumnName } = validationProps;

    const autorComMesmoNome = await this.entityManager.findOne(Entity, {
      [ColumnName]: value,
    });

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
