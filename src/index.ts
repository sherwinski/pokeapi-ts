import type {
  TPokedex,
  TResource,
  TSearchOptions,
  TPokemon,
  TGeneration,
} from "../types/Pokedex";
import request from "./utils/request";
import {
  NamedAPIResourceList,
  Pokemon as PokemonResourceResponse,
  Generation as GenerationResourceResponse,
} from "pokenode-ts";

export default class Pokedex {
  private baseUrl: string;
  private apiVersion: string;

  constructor(options?: TPokedex) {
    this.baseUrl = options?.baseUrl || "https://pokeapi.co/api/v";
    this.apiVersion = options?.apiVersion ? String(options?.apiVersion) : "2";
  }

  get pokemon(): Pokemon {
    return new Pokemon({
      apiVersion: this.apiVersion,
      baseUrl: this.baseUrl,
      endpoint: "pokemon",
    });
  }

  get generation(): Generation {
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
    this.url = new URL(`${baseUrl}${apiVersion}/`);
  }
}

interface IResource<T, U> {
  search(options?: TSearchOptions): Promise<T>;
  searchById?(id: number, options: TSearchOptions): Promise<U>;
  searchByName?(name: string, options: TSearchOptions): Promise<U>;
}

export class Pokemon
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

  searchById(
    id: number,
    options?: TSearchOptions
  ): Promise<PokemonResourceResponse> {
    const identifier = `${id}/`;
    return request({
      url: this.url,
      endpoint: this.endpoint,
      identifier: identifier,
      ...options,
    }) as Promise<PokemonResourceResponse>;
  }

  searchByName(
    name: string,
    options?: TSearchOptions
  ): Promise<PokemonResourceResponse> {
    const identifier = `${name}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<PokemonResourceResponse>;
  }
}

export class Generation
  extends Resource<TGeneration>
  implements IResource<NamedAPIResourceList, GenerationResourceResponse>
{
  search(options?: TSearchOptions): Promise<NamedAPIResourceList> {
    return request({
      url: this.url,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<NamedAPIResourceList>;
  }

  searchById(
    id: number,
    options?: TSearchOptions
  ): Promise<GenerationResourceResponse> {
    const identifier = `${id}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<GenerationResourceResponse>;
  }

  searchByName(
    name: string,
    options?: TSearchOptions
  ): Promise<GenerationResourceResponse> {
    const identifier = `${name}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<GenerationResourceResponse>;
  }
}

export type TPokemonClass = typeof Pokemon;
export type TGenerationClass = typeof Generation;
