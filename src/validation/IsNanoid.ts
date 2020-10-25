import { registerDecorator, ValidationOptions } from "class-validator";

export const IsNanoid = (validationOptions?: ValidationOptions) => (
  object: Object,
  propertyName: string,
) => {
  registerDecorator({
    name: "IsNanoid",
    target: object.constructor,
    propertyName: propertyName,
    options: {
      ...validationOptions,
    },
    validator: {
      validate(value: string) {
        return typeof value === "string" && value.length === 21;
      },
      defaultMessage() {
        return `${propertyName} must be a nanoid string`;
      },
    },
  });
};
