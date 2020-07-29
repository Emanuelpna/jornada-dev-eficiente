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
    const validationProps: ValidationProps = validationArguments.constraints[0];

    const { Entity } = validationProps;

    const autorComMesmoNome = await this.entityManager.findOne(Entity, {
      id: value,
    });

    if (autorComMesmoNome) {
      return true;
    }

    return false;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const validationProps: ValidationProps = validationArguments.constraints[0];

    return `Não foi encontrado nenhum registro para ${validationProps.ColumnName}`;
  }
}
