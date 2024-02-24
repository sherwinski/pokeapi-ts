/**
 * Constructor type definitions
 */
export type TPokedex =
  | {
      apiVersion: string;
      baseUrl: string;
    }
  | {
      apiVersion: never;
      baseUrl: string;
    };

export interface TResource {
  apiVersion: string;
  baseUrl: string;
  endpoint: string;
}

interface TPokemonResource extends TResource {
  endpoint: "pokemon";
}

export type TPokemon = { [K in keyof TPokemonResource]: TPokemonResource[K] };

interface TGenerationResource extends TResource {
  endpoint: "generation";
}

export type TGeneration = {
  [K in keyof TGenerationResource]: TGenerationResource[K];
};

/**
 * Resource method type definitions
 */

export type TRequestParams = {
  url: URL;
  identifier?: string;
  endpoint: string;
} & { [K in keyof TSearchOptions]: TSearchOptions[K] };

export type TSearchOptions =
  | {
      limit?: number;
      offset?: number;
    }
  | {
      limit: never;
      offset: never;
    };
