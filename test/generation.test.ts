import Pokedex, { Generation, TGenerationClass } from "../src/index";

describe("Pokemon class", () => {
  let generation: InstanceType<TGenerationClass>;

  beforeEach(() => {
    generation = new Pokedex().generation;
  });

  it("should create a new instance of Pokemon", () => {
    expect(generation).toBeInstanceOf(Generation);
  });
});
