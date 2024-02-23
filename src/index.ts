import type PokemonResponse from "./utils/pokemon.types";
import type GenerationResponse from "./utils/generation.types";
import type { TPokedex, TResource, TSearchOptions } from "../types/Pokedex";
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
    return request(this.url, { endpoint: this.endpoint });
  }

  searchById(id: number): Promise<PokemonResponse> {
    this.url.pathname += `${id}/`;
    return request(this.url, { endpoint: this.endpoint });
  }

  searchByName(name: string): Promise<PokemonResponse> {
    this.url.pathname += `${name}/`;
    return request(this.url, { endpoint: this.endpoint });
  }
}

class Generation {
  url: URL;
  endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: TResource) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }

  search(): Promise<GenerationResponse> {
    return request(this.url, { endpoint: this.endpoint });
  }

  searchById(id: number): Promise<GenerationResponse> {
    this.url.pathname += `${id}/`;
    return request(this.url, { endpoint: this.endpoint });
  }

  searchByName(name: string): Promise<GenerationResponse> {
    this.url.pathname += `${name}/`;
    return request(this.url, { endpoint: this.endpoint });
  }
}
