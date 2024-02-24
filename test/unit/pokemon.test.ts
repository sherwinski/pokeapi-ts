import Pokedex, { TPokemonClass } from "../../src/index";

// Mock the global fetch
global.fetch = jest.fn();

describe("Pokemon Class", () => {
  let pokemon: InstanceType<TPokemonClass>;

  beforeAll(() => {
    pokemon = new Pokedex().pokemon;
  });

  beforeEach(() => {
    // Mock the fetch response
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    // Clear all instances and calls to constructor and all methods
    (global.fetch as jest.Mock).mockClear();
  });

  it("getById requests the correct URL", async () => {
    await pokemon.searchById(1);

    // jest is not able to compare the URL object, so we convert it to a string
    const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(fetchUrl.toString()).toBe("https://pokeapi.co/api/v2/pokemon/1/");
  });
});
