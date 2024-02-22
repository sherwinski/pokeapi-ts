import type { TPokedex } from "../types/Pokedex";

export default class Pokedex {
  baseUrl: string;
  apiVersion: string;

  constructor(options?: TPokedex) {
    this.baseUrl = options?.baseUrl || "https://pokeapi.co/api/v";
    this.apiVersion = options?.apiVersion || "2";
  }

  pokemon(): any {
    return new Pokemon({
      apiVersion: this.apiVersion,
      baseUrl: this.baseUrl,
      endpoint: "pokemon",
    });
  }

  generation(): any {
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

  constructor({ apiVersion, baseUrl, endpoint }: any) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }
}

class Generation {
  url: URL;
  endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: any) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/${endpoint}/`);
  }
}
