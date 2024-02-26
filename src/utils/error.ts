import { PokemonApiErrorDetails } from "../../types/Error";

export class PokemonApiError extends Error {
  constructor({ code, details }: PokemonApiErrorDetails) {
    super(`${code}: ${details}`);
    this.name = "PokemonApiError";

    // This line is necessary for the instance to be correctly recognized as PokemonApiError type
    // in environments that support custom error types (like Node.js and modern browsers)
    Object.setPrototypeOf(this, PokemonApiError.prototype);
  }
}
