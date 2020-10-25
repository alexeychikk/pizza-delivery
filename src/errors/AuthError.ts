import { StatusError } from "./StatusError";

export class AuthError extends StatusError {
  constructor(message: string = "Not authorized") {
    super(401, message);
  }
}
