import Pokedex from "../../src/Pokedex";

describe("Pokedex class", () => {
  let pokedex: Pokedex;

  beforeEach(() => {
    pokedex = new Pokedex();
  });

  it("should create a new instance of Pokedex", () => {
    expect(pokedex).toBeInstanceOf(Pokedex);
  });

  describe("pokemon", () => {
    it("should return a Pokemon instance", () => {
      const pokemon = pokedex.pokemon;
      expect(pokemon).toBeDefined();
    });
  });

  describe("generation", () => {
    it("should return a Generation instance", () => {
      const generation = pokedex.generation;
      expect(generation).toBeDefined();
    });
  });
});
