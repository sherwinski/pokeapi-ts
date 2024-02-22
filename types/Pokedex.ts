export type TPokedex =
  | {
      apiVersion: string;
      baseUrl: string;
    }
  | {
      apiVersion: never;
      baseUrl: string;
    };
