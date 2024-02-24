import Pokedex, { TPokemonClass } from "../../src/index";
import PokemonResponse, {
  PokemonSampleResponse,
} from "../../src/utils/pokemon.types";
import { PokemonApiError } from "../../src/error";

describe("Pokemon Class", () => {
  let pokemon: InstanceType<TPokemonClass>;
  const limit = 2;
  const options = { offset: 1, limit: limit };

  beforeAll(() => {
    pokemon = new Pokedex().pokemon;
  });

  describe("endpoint methods", () => {
    it("returns data in the expected shape when invoking search()", async () => {
      const data: PokemonResponse = await pokemon.search();

      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("next");
      expect(data).toHaveProperty("previous");
      expect(data).toHaveProperty("results");
    });

    it("returns data in the expected shape when invoking search with pagination options", async () => {
      const data: PokemonResponse = await pokemon.search(options);

      expect(data).toHaveProperty("count");
      expect(data).toHaveProperty("next");
      expect(data).toHaveProperty("previous");
      expect(data).toHaveProperty("results");
      //@ts-ignore TODO fix types
      expect(data?.results.length).toBe(limit);
    });

    it("returns data in the expected shape when invoking searchById()", async () => {
      const data: PokemonResponse = await pokemon.searchById(1);

      for (const field in PokemonSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });

    it("returns data in the expected shape when invoking searchById with pagination options", async () => {
      const data: PokemonResponse = await pokemon.searchById(1, options);

      for (const field in PokemonSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });

    it("returns data in the expected shape when invoking searchByName()", async () => {
      const data: PokemonResponse = await pokemon.searchByName("pikachu");

      for (const field in PokemonSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });

    it("returns data in the expected shape when invoking searchByName with pagination options", async () => {
      const data: PokemonResponse = await pokemon.searchByName(
        "pikachu",
        options
      );

      for (const field in PokemonSampleResponse) {
        expect(data).toHaveProperty(field);
      }
    });
  });

  describe("error handling", () => {
    it("throws an error when invoking searchById() with an invalid id", async () => {
      await expect(pokemon.searchById(-1)).rejects.toThrow(PokemonApiError);
    });

    it("throws an error when invoking searchByName() with an invalid name", async () => {
      await expect(pokemon.searchByName("Agumon")).rejects.toThrow(
        PokemonApiError
      );
    });
  });
});
