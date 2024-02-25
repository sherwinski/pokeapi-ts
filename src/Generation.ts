import type { TSearchOptions, TGeneration } from "../types/Pokedex";
import request from "./utils/request";
import {
  NamedAPIResourceList,
  Generation as GenerationResourceResponse,
} from "pokenode-ts";
import { Resource, IResource } from "./Resource";

export default class Generation
  extends Resource<TGeneration>
  implements IResource<NamedAPIResourceList, GenerationResourceResponse>
{
  search(options?: TSearchOptions): Promise<NamedAPIResourceList> {
    return request({
      url: this.url,
      endpoint: this.endpoint,
      ...options,
    }) as Promise<NamedAPIResourceList>;
  }

  searchById(id: number): Promise<GenerationResourceResponse> {
    const identifier = `${id}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
    }) as Promise<GenerationResourceResponse>;
  }

  searchByName(name: string): Promise<GenerationResourceResponse> {
    const identifier = `${name}/`;
    return request({
      url: this.url,
      identifier: identifier,
      endpoint: this.endpoint,
    }) as Promise<GenerationResourceResponse>;
  }
}

export type TGenerationClass = typeof Generation;
