export enum PokemonApiErrorCodes {
  RESOURCE_NOT_FOUND = "ResourceNotFound",
  SERVER_ERROR = "ServerError",
}

export interface PokemonApiErrorDetails {
  code: PokemonApiErrorCodes;
  details?: string;
}
