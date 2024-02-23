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

export type TSearchOptions =
  | {
      limit?: number;
      offset?: number;
    }
  | {
      limit: never;
      offset: never;
    };

export type TRequestParams = {
  url: URL;
  pathname?: string;
  endpoint: string;
} & { [K in keyof TSearchOptions]: TSearchOptions[K] };

export type TSearchByIdOptions = {
  id: number;
} & { [K in keyof TSearchOptions]: TSearchOptions[K] };

export type TSearhByNameOptions = {
  name: string;
} & { [K in keyof TSearchOptions]: TSearchOptions[K] };
