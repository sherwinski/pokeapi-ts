import { PokemonApiError } from "../error";
import { PokemonApiErrorCodes } from "../../types/Error";
import { TRequestParams } from "../../types/Pokedex";

export default async function request({
  url,
  identifier,
  endpoint,
  ...options
}: TRequestParams): Promise<any> {
  // TODO make a more generic return type
  // Requires fixing types e.g. pokemon.types.ts
  try {
    const pokeUrl = constructUrl({ url, identifier, endpoint, ...options });
    const response = await fetch(pokeUrl);

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

function constructUrl({
  url,
  identifier,
  endpoint,
  ...options
}: TRequestParams) {
  const urlCopy = new URL(url);
  urlCopy.pathname += endpoint + "/";

  const { offset, limit } = options;
  if (limit) urlCopy.searchParams.set("limit", String(limit));
  if (offset) urlCopy.searchParams.set("offset", String(offset));
  if (identifier) urlCopy.pathname += identifier;

  return urlCopy;
}
