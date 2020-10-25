import { validate as _validate } from "class-validator";

import { ValidationError } from "@src/errors";

type Constructable<T> = new (data: T) => T;

export const validate = async <T>(
  cls: Constructable<T>,
  input: Object,
  groups?: string[],
): Promise<T> => {
  const instance = new cls(input as T);
  const errors = await _validate(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
    groups,
  });
  if (errors.length) {
    throw new ValidationError(errors);
  }
  return instance;
};
