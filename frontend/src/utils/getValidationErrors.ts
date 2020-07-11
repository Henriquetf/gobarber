import { ValidationError } from 'yup';

type Errors = Record<string, string>;

export default function getValidationErrors(
  validationError: ValidationError,
): Errors {
  return validationError.inner.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.path]: currentValue.message,
    }),
    {},
  );
}
