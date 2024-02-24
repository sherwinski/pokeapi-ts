import Pokedex, { TGenerationClass } from "../../src/index";
import GenerationResponse, {
  GenerationSampleResponse,
} from "../../src/utils/generation.types";
import { PokemonApiError } from "../../src/error";

describe("Pokemon class", () => {
  let generation: InstanceType<TGenerationClass>;

  beforeAll(() => {
    generation = new Pokedex().generation;
  });

  describe("endpoint methods", () => {
    it("returns data in the expected shape when invoking search()", async () => {
      const data: GenerationResponse = await generation.search();

      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("next");
      expect(data).toHaveProperty("previous");
      expect(data).toHaveProperty("results");
    });

    it("returns data in the expected shape when invoking searchById()", async () => {
      const data: GenerationResponse = await generation.searchById(1);

      for (const field in GenerationSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });
    it("returns data in the expected shape when invoking searchByName()", async () => {
      const data: GenerationResponse = await generation.searchByName(
        "generation-i"
      );

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
        PokemonApiError
      );
    });
  });
});
