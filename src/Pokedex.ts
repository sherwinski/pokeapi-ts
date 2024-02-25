import type { TPokedex } from "../types/Pokedex";
import Pokemon from "./Pokemon";
import Generation from "./Generation";

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
