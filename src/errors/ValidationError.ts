import { ValidationError as CVError } from "class-validator";
import { StatusError } from "./StatusError";

export class ValidationError extends StatusError {
  constructor(inputErrors: Object[] | Object | string) {
    super(
      400,
      `Validation failed:\n${ValidationError.normalizeErrors(inputErrors)}`,
    );
  }

  public static normalizeErrors(
    inputErrors: Object[] | Object | string,
  ): string {
    const errors = !Array.isArray(inputErrors) ? [inputErrors] : inputErrors;
    return errors
      .map((e) => {
        if (e instanceof CVError && !e.children) {
          e.children = [];
        }
        return e.toString();
      })
      .join("\n");
  }
}
