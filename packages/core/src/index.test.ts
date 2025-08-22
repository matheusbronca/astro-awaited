import { describe, it, expect } from "vitest";
import { transformFallbackComponents } from "./setup/fallback-transformer";

describe("transformFallbackComponents", () => {
  it('should add slot="fallback" to Fallback components without a slot attribute', () => {
    const input = `
      <Awaited>
        <ResultsList query={searchQuery} page={searchPage} />
        <Fallback>
          Carregando...
        </Fallback>
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <ResultsList query={searchQuery} page={searchPage} />
        <Fallback slot="fallback">
          Carregando...
        </Fallback>
      </Awaited>
    `;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should not modify Fallback components that already have a slot attribute", () => {
    const input = `
      <Awaited>
        <ResultsList query={searchQuery} page={searchPage} />
        <Fallback slot="custom">
          Carregando...
        </Fallback>
      </Awaited>
    `;
    const expected = input;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should handle Fallback components with other attributes", () => {
    const input = `
      <Awaited>
        <Fallback class="loading-spinner" id="my-fallback">
          Loading...
        </Fallback>
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <Fallback class="loading-spinner" id="my-fallback" slot="fallback">
          Loading...
        </Fallback>
      </Awaited>
    `;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should handle multiple Fallback components", () => {
    const input = `
      <Awaited>
        <Fallback>
          First loading...
        </Fallback>
        <AnotherComponent />
        <Fallback class="another-one">
          Second loading...
        </Fallback>
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <Fallback slot="fallback">
          First loading...
        </Fallback>
        <AnotherComponent />
        <Fallback class="another-one" slot="fallback">
          Second loading...
        </Fallback>
      </Awaited>
    `;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should not modify other components", () => {
    const input = `
      <Awaited>
        <SomeOtherComponent>
          Content
        </SomeOtherComponent>
      </Awaited>
    `;
    const expected = input;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should handle custom component name", () => {
    const input = `
      <Awaited>
        <MyLoadingComponent>
          Loading...
        </MyLoadingComponent>
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <MyLoadingComponent slot="custom-slot">
          Loading...
        </MyLoadingComponent>
      </Awaited>
    `;
    expect(
      transformFallbackComponents(input, "MyLoadingComponent", "custom-slot"),
    ).toBe(expected);
  });

  it("should handle self-closing Fallback components", () => {
    const input = `
      <Awaited>
        <Fallback />
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <Fallback slot="fallback" />
      </Awaited>
    `;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });

  it("should handle self-closing Fallback components with attributes", () => {
    const input = `
      <Awaited>
        <Fallback class="test" />
      </Awaited>
    `;
    const expected = `
      <Awaited>
        <Fallback class="test" slot="fallback" />
      </Awaited>
    `;
    expect(transformFallbackComponents(input, "Fallback", "fallback")).toBe(
      expected,
    );
  });
});
