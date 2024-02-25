import { PokemonApiErrorDetails } from "../../types/Error";

export class PokemonApiError extends Error {
  constructor({ code, details }: PokemonApiErrorDetails) {
    super(`${code}: ${details}`);
    this.name = "PokemonApiError";
  }
}
