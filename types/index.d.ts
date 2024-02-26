import type { TGeneration, TPokedex, TSearchOptions } from "./Pokedex";
import type Pokemon from "../src/Pokemon";
import Generation from "../src/Generation";
import type {
  NamedAPIResourceList,
  Pokemon as PokemonResourceResponse,
  Generation as GenerationResourceResponse,
} from "pokenode-ts";
import { PokemonApiErrorDetails } from "./Error";

declare module "@sherwinski/pokeapi-ts" {
  export class Pokedex {
    constructor(options?: TPokedex);

    get pokemon(): Pokemon;
    get generation(): Generation;
  }

  export class Pokemon {
    search(options?: TSearchOptions): Promise<NamedAPIResourceList>;
    searchById(id: number): Promise<PokemonResourceResponse>;
    searchByName(name: string): Promise<PokemonResourceResponse>;
  }

  export class Generation {
    search(options?: TSearchOptions): Promise<NamedAPIResourceList>;
    searchById(id: number): Promise<GenerationResourceResponse>;
    searchByName(name: string): Promise<GenerationResourceResponse>;
  }
}
