# pokeapi-ts

A TypeScript SDK that wraps the RESTful [Pokémon API](https://pokeapi.co/) for all things from the Pokémon world and games. For more information on the API itself, please see the [documentation](https://pokeapi.co/docs/v2).

## Installation

```
# NPM
npm install @sherwinski/pokeapi-ts

# Pnpm
pnpm install @sherwinski/pokeapi-ts

# Bun
bun install @sherwinski/pokeapi-ts

# Yarn
yarn install @sherwinski/pokeapi-ts
```

## Usage

```typescript
import Pokedex from "@sherwinski/pokeapi-ts";

const poke = new Pokedex();
const firstTenPokemon = await poke.pokemon.search({ limit: 10 });

firstTenPokemon.results.map((pokemon) => console.log(pokemon.name));
```

The top-level `Pokedex` class exposes various methods by which users can query data from that endpoint. For example, `new Pokedex().pokemon` provides users with an interface to search for data around Pokémon. See the [Endpoints](#endpoints) section for more examples of this.

### Endpoints

#### Pokemon

**search({ limit: number, offset: number})**

```typescript
const data = await new Pokedex().pokemon.search();

// paginate using the `limit` and `offset` options
const limitedData = await new Pokedex().pokemon.search({
  limit: 10,
  offset: 5,
});

console.log(data);
console.log(limitedData);
```

**searchById(id: number)**

```typescript
const data = await new Pokedex().pokemon.searchById(10);

console.log(data);
```

**searchByName(name: string)**

```typescript
const data = await new Pokedex().pokemon.searchByName("pikachu");

console.log(data);
```

#### Generation

**search({ limit: number, offset: number})**

```typescript
const data = await new Pokedex().generation.search();

// paginate using the `limit` and `offset` options
const limitedData = await new Pokedex().generation.search({
  limit: 10,
  offset: 5,
});

console.log(data);
console.log(limitedData);
```

**searchById(id: number)**

```typescript
const data = await new Pokedex().generation.searchById(1);

console.log(data);
```

**searchByName(name: string)**

```typescript
const data = await new Pokedex().generation.searchByName("generation-i");

console.log(data);
```

## Testing

Run tests by cloning down this project, installing it's dependencies, and running the test script.

```
npm install
npm run test
```

## Design

This library is designed to be a lightweight wrapper around the [Pokémon API](https://pokeapi.co/) that relies on as few dependencies as possible. The other goal of this project is to provide a delightful developer-experience through an intuitive API. With a TypeScript-enabled editor, users should be able to navigate the library's interface and query returned data easily.

This project exports a top-level class `Pokedex`, which a user can instantiate once. From there, the class instance exposes a getter for each respective endpoint (e.g. `pokemon`) that itself contains different methods for querying data. The idea is that users should be able to chain these calls together to create an easy-to-read invocation e.g. `pokedex.pokemon.search()`. This not only has the benefit of providing a self-documenting interface, but should hopefully shallow the learning curve to using the rest of it. For example, if one can `search` by `pokemon` then they should be able to do same by any other endpoint, e.g. `generation`.

At the moment this project does not map to all of the API's endpoints, however, the library is designed with extensibility in mind. Because the source code is built with TypeScript, users can add new endpoints by following the contracts enforced by the type definitions of the `Pokedex` class.

It is worth calling out that this project currently relies on one external dependency to bolster its type definitions. [pokenode-ts](https://github.com/Gabb-c/pokenode-ts) exports types [[1](https://github.com/Gabb-c/pokenode-ts/blob/ed75dc3af51ad9cb29d1d991379f163c195724a2/src/models/Common/resource.ts)] [[2](https://github.com/Gabb-c/pokenode-ts/blob/main/src/models/Pokemon/pokemon.ts)] [[3](https://github.com/Gabb-c/pokenode-ts/blob/ed75dc3af51ad9cb29d1d991379f163c195724a2/src/models/Game/generation.ts)] for the schema of the data returned by the underlying API's endpoints. Utilizing these types helped speed up development without needing to re-invent the wheel. In the future, it may be worth pulling out only the necessary types for this project to cut down on bundle size.

Given more time, it would be worth exploring a few new features in addition to what is already provided in this library:

- More exhaustive coverage of endpoints
- Configurations to override request headers
- Caching requests
- Retries on failed requests
- Transpile source code into more backwards-compatible versions of JavaScript, and CommonJS to optionally be used on the client
