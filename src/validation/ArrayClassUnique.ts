import {
  buildMessage,
  isInstance,
  ValidateBy,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function arrayClassUnique(
  value: unknown,
  args: ValidationArguments,
): boolean {
  if (!(value instanceof Array)) {
    return false;
  }

  const constructor = args.constraints[0];
  const fn = args.constraints[1];
  const ids = value.map((v: unknown) => {
    if (isInstance(v, constructor)) {
      return fn(v);
    } else {
      return null;
    }
  });
  const uids = new Set(ids);

  return (
    uids.size === value.length &&
    uids.has(null) === false &&
    uids.has(undefined) === false
  );
}

/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 * If null or undefined is given then this function returns false.
 */
export function ArrayClassUnique<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetType: new (...args: any[]) => T,
  uidFn: (arg: T) => T[keyof T],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: "uniqueArrayItemByProperty",
      constraints: [targetType, uidFn],
      validator: {
        validate: (value, args): boolean => {
          return arrayClassUnique(value, args!);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix} All $property's elements must be unique`;
        }, validationOptions),
      },
    },
    validationOptions,
  );
}
