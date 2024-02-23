import type PokemonResponse from "./utils/pokemon.types";
import type GenerationResponse from "./utils/generation.types";
import type {
  TPokedex,
  TResource,
  TSearchOptions,
  TSearchByIdOptions,
  TSearhByNameOptions,
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

class Pokemon {
  url: URL;
  endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: TResource) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }

  search(options?: TSearchOptions): Promise<PokemonResponse> {
    return request({ url: this.url, endpoint: this.endpoint, ...options });
  }

  searchById({ id, ...options }: TSearchByIdOptions): Promise<PokemonResponse> {
    const pathname = `${id}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }

  searchByName({
    name,
    ...options
  }: TSearhByNameOptions): Promise<PokemonResponse> {
    const pathname = `${name}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }
}

class Generation {
  url: URL;
  endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: TResource) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }

  search(options?: TSearchOptions): Promise<GenerationResponse> {
    return request({ url: this.url, endpoint: this.endpoint, ...options });
  }

  searchById({
    id,
    ...options
  }: TSearchByIdOptions): Promise<GenerationResponse> {
    const pathname = `${id}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }

  searchByName({
    name,
    ...options
  }: TSearhByNameOptions): Promise<GenerationResponse> {
    const pathname = `${name}/`;
    return request({
      url: this.url,
      pathname: pathname,
      endpoint: this.endpoint,
      ...options,
    });
  }
}
