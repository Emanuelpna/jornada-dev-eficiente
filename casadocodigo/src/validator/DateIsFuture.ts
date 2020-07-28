import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateIsFuture', async: false })
export class DateIsFuture implements ValidatorConstraintInterface {
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
