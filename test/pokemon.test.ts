import Pokedex, { Pokemon, TPokemonClass } from "../src/index";

describe("Pokemon class", () => {
  let pokemon: InstanceType<TPokemonClass>;

  beforeEach(() => {
    pokemon = new Pokedex().pokemon;
  });

  it("should create a new instance of Pokemon", () => {
    expect(pokemon).toBeInstanceOf(Pokemon);
  });
});
