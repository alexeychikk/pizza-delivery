import { StatusError } from "./StatusError";

export class NotFoundError extends StatusError {
  constructor(message: string = "Not found") {
    super(404, message);
  }
}
