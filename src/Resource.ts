import type { TResource, TSearchOptions } from "../types/Pokedex";

export class Resource<T extends TResource> {
  protected url: URL;
  protected endpoint: string;

  constructor({ apiVersion, baseUrl, endpoint }: T) {
    this.endpoint = endpoint;
    this.url = new URL(`${baseUrl}${apiVersion}/`);
  }
}

export interface IResource<T, U> {
  search(options?: TSearchOptions): Promise<T>;
  searchById?(id: number): Promise<U>;
  searchByName?(name: string): Promise<U>;
}
