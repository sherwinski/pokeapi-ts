import type { TSearchOptions, TPokemon } from "../types/Pokedex";
import request from "./utils/request";
import {
  NamedAPIResourceList,
  Pokemon as PokemonResourceResponse,
} from "pokenode-ts";
import { Resource, IResource } from "./Resource";

export default class Pokemon
  extends Resource<TPokemon>
  implements IResource<NamedAPIResourceList, PokemonResourceResponse>
{
  search(options?: TSearchOptions): Promise<NamedAPIResourceList> {
    return request({
      url: this.url,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<NamedAPIResourceList>;
  }

  searchById(id: number): Promise<PokemonResourceResponse> {
    const identifier = `${id}/`;
    return request({
      url: this.url,
      endpoint: this.endpoint,
      identifier: identifier,
    }) as Promise<PokemonResourceResponse>;
  }

  searchByName(name: string): Promise<PokemonResourceResponse> {
    const identifier = `${name}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
    }) as Promise<PokemonResourceResponse>;
  }
}

export type TPokemonClass = typeof Pokemon;
