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

export type TResource = {
  apiVersion: string;
  baseUrl: string;
  endpoint: string;
};

export type TPokemon = {
  endpoint: "pokemon";
} & { [K in keyof TResource]: TResource[K] };

export type TGeneration = TResource & {
  endpoint: "generation";
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
