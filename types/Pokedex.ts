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


export type TRequestParams = {
  url: URL;
  pathname?: string;
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
