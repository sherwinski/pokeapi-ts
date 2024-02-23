import { PokemonApiError } from "../error";
import { PokemonApiErrorCodes } from "../../types/Error";
import { TRequestParams } from "../../types/Pokedex";

export default async function request({
  url,
  pathname,
  endpoint,
  ...options
}: TRequestParams): Promise<any> {
  // TODO make a more generic return type
  try {
    if (options?.limit) url.searchParams.set("limit", String(options?.limit));
    if (options?.offset)
      url.searchParams.set("offset", String(options?.offset));
    if (pathname) url.pathname += pathname;

    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new PokemonApiError({
          code: PokemonApiErrorCodes.RESOURCE_NOT_FOUND,
          details: `${endpoint} not found.`,
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
