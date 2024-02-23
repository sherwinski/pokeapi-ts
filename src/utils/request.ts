import { PokemonApiError } from "../error";
import { PokemonApiErrorCodes } from "../../types/Error";

export default async function request(
  url: URL,
  options?: { endpoint: string }
) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new PokemonApiError({
          code: PokemonApiErrorCodes.RESOURCE_NOT_FOUND,
          details: `${options?.endpoint} not found.`,
        });
      } else {
        throw new PokemonApiError({
          code: PokemonApiErrorCodes.SERVER_ERROR,
          details: "Unexpected server error.",
        });
      }
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
