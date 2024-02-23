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
