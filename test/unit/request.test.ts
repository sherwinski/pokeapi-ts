import request from "../../src/utils/request";

// Mock the global fetch
global.fetch = jest.fn();

describe("Request utility", () => {
  const url = new URL("https://pokeapi.co/api/v2/");
  const identifier = "1/";
  const endpoint = "pokemon";
  const options = {
    limit: 10,
    offset: 0,
  };

  describe("makes requests to pokeapi.co", () => {
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

    it("constructs the correct URL from parameters", async () => {
      const expected = "https://pokeapi.co/api/v2/pokemon/1/";
      await request({
        url: url,
        identifier: identifier,
        endpoint: endpoint,
      });

      // jest is not able to compare the URL object, so we convert it to a string
      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl.toString()).toBe(expected);
    });

    it("includes pagination options when constructing the URL", async () => {
      const expected = "https://pokeapi.co/api/v2/pokemon/1/?limit=10";
      await request({
        url: url,
        identifier: identifier,
        endpoint: endpoint,
        ...options,
      });

      // jest is not able to compare the URL object, so we convert it to a string
      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl.toString()).toBe(expected);
    });
  });

  describe("handles errors", () => {
    beforeEach(() => {});

    afterEach(() => {
      // Clear all instances and calls to constructor and all methods
      (global.fetch as jest.Mock).mockClear();
    });

    it("throws a ResourceNotFound error", async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.reject({}),
        })
      );

      const expected = `ResourceNotFound: ${endpoint} not found.`;
      await expect(
        request({
          url: url,
          identifier: identifier,
          endpoint: endpoint,
        })
      ).rejects.toThrow(expected);
    });

    it("throws a Server Error", async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );

      await expect(
        request({
          url: url,
          identifier: identifier,
          endpoint: endpoint,
        })
      ).rejects.toThrow("Unexpected server error.");
    });
  });
});
