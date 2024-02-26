import Pokedex from "../../src/Pokedex";
import TGenerationClass from "../../src/Generation";
import { GenerationSampleResponse } from "../../src/utils/generation.types";
import { PokemonApiError } from "../../src/utils/error";
import {
  NamedAPIResourceList,
  Generation as GenerationResourceResponse,
} from "pokenode-ts";

describe("Pokemon class", () => {
  let generation: TGenerationClass;
  const limit = 2;
  const options = { offset: 1, limit: limit };

  beforeAll(() => {
    generation = new Pokedex().generation;
  });

  describe("endpoint methods", () => {
    it("returns data in the expected shape when invoking search()", async () => {
      const data: NamedAPIResourceList = await generation.search();

      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("next");
      expect(data).toHaveProperty("previous");
      expect(data).toHaveProperty("results");
    });

    it("returns data in the expected shape when invoking search with pagination options", async () => {
      const data: NamedAPIResourceList = await generation.search(options);

      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("next");
      expect(data).toHaveProperty("previous");
      expect(data).toHaveProperty("results");
      expect(data?.results.length).toBe(limit);
    });

    it("returns data in the expected shape when invoking searchById()", async () => {
      const data: GenerationResourceResponse = await generation.searchById(1);

      for (const field in GenerationSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });

    it("returns data in the expected shape when invoking searchByName()", async () => {
      const data: GenerationResourceResponse =
        await generation.searchByName("generation-i");

      for (const field in GenerationSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });
  });

  describe("error handling", () => {
    it("throws an error when invoking searchById() with an invalid id", async () => {
      await expect(generation.searchById(-1)).rejects.toThrow(PokemonApiError);
    });

    it("throws an error when invoking searchByName() with an invalid name", async () => {
      await expect(generation.searchByName("generation-1")).rejects.toThrow(
        PokemonApiError,
      );
    });
  });
});
