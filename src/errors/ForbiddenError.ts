import { StatusError } from "./StatusError";

export class ForbiddenError extends StatusError {
  constructor(message: string = "Resource is forbidden") {
    super(403, message);
  }
}
