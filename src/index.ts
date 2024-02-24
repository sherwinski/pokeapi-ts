import type PokemonResponse from "./utils/pokemon.types";
import type GenerationResponse from "./utils/generation.types";
import type {
  TPokedex,
  TResource,
  TSearchOptions,
  TPokemon,
  TGeneration,
} from "../types/Pokedex";
import request from "./utils/request";

export default class Pokedex {
  baseUrl: string;
  apiVersion: string;

  constructor(options?: TPokedex) {
    this.baseUrl = options?.baseUrl || "https://pokeapi.co/api/v";
    this.apiVersion = options?.apiVersion || "2";
  }

  pokemon(): Pokemon {
    return new Pokemon({
      apiVersion: this.apiVersion,
      baseUrl: this.baseUrl,
      endpoint: "pokemon",
    });
  }

  generation(): Generation {
    return new Generation({
      apiVersion: this.apiVersion,
      baseUrl: this.baseUrl,
      endpoint: "generation",
    });
  }
}

class Resource<T extends TResource> {
  protected url: URL;
  protected endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: T) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }
}

interface IResource<T> {
  search(options?: TSearchOptions): Promise<T>;
  searchById?(id: number, options: TSearchOptions): Promise<T>;
  searchByName?(name: string, options: TSearchOptions): Promise<T>;
}

class Pokemon extends Resource<TPokemon> implements IResource<PokemonResponse> {
  search(options?: TSearchOptions): Promise<PokemonResponse> {
    return request({ url: this.url, endpoint: this.endpoint, ...options });
  }

  searchById(
    id: number,
    { ...options }: TSearchOptions
  ): Promise<PokemonResponse> {
    const pathname = `${id}/`;
    return request({
      url: this.url,
      endpoint: this.endpoint,
      pathname: pathname,
      ...options,
    });
  }

  searchByName(
    name: string,
    { ...options }: TSearchOptions
  ): Promise<PokemonResponse> {
    const pathname = `${name}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }
}

class Generation
  extends Resource<TGeneration>
  implements IResource<GenerationResponse>
{
  search(options?: TSearchOptions): Promise<GenerationResponse> {
    return request({ url: this.url, endpoint: this.endpoint, ...options });
  }

  searchById(
    id: number,
    { ...options }: TSearchOptions
  ): Promise<GenerationResponse> {
    const pathname = `${id}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }

  searchByName(
    name: string,
    { ...options }: TSearchOptions
  ): Promise<GenerationResponse> {
    const pathname = `${name}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }
}
