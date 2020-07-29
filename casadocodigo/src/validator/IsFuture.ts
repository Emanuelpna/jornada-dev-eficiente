import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsFuture', async: false })
export class IsFuture implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const data = new Date(value);

    const hoje = Date.now();

    const dataMs = data.getTime();

    const diff = dataMs - hoje;

    const isFuture = diff > 0;

    return isFuture;
  }

  defaultMessage(): string {
    return `Data de publicação precisa estar no futuro`;
  }
}
