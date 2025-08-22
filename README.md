# Astro Awaited/Fallback Integration

An Astro integration that provides `Awaited` and `Fallback` components with automatic slot transformation for better developer experience.

## Features

- 🚀 **Automatic Slot Assignment**: Automatically adds `slot="fallback"` to `Fallback` components
- 🎯 **Zero Configuration**: Works out of the box with sensible defaults
- 🔧 **Customizable**: Configure component names and slot names
- 📦 **TypeScript Support**: Full TypeScript support with type definitions
- ⚡ **Fast**: Minimal build-time overhead with efficient AST transformation

## Installation

```bash
npm install astro-awaited-fallback
```

## Usage

### 1. Add the integration to your Astro config

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import awaitedFallback from "astro-awaited-fallback";

export default defineConfig({
  integrations: [awaitedFallback()],
});
```

### 2. Import and use the components

```astro
---
// SearchPage.astro
import { Awaited, Fallback } from 'astro-awaited-fallback';
import ResultsList from './ResultsList.astro';
---

<Awaited>
  <ResultsList query={searchQuery} page={searchPage} />
  <Fallback>
    Carregando...
  </Fallback>
</Awaited>
```

### 3. The integration automatically transforms your code

The integration will automatically transform your `Fallback` components to include the `slot="fallback"` attribute:

```astro
<!-- Before transformation -->
<Awaited>
  <ResultsList query={searchQuery} page={searchPage} />
  <Fallback>
    Carregando...
  </Fallback>
</Awaited>

<!-- After transformation -->
<Awaited>
  <ResultsList query={searchQuery} page={searchPage} />
  <Fallback slot="fallback">
    Carregando...
  </Fallback>
</Awaited>
```

## Configuration

You can customize the integration behavior by passing options:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import awaitedFallback from "astro-awaited-fallback";

export default defineConfig({
  integrations: [
    awaitedFallback({
      componentName: "Fallback", // Component name to transform (default: 'Fallback')
      slotName: "fallback", // Slot name to add (default: 'fallback')
    }),
  ],
});
```

## Components

### Awaited

A wrapper component that conditionally renders its children or a fallback.

```astro
<div class="only:hidden flex-col">
  <slot name="fallback" />
  <slot />
</div>
```

### Fallback

A component intended to be used as a placeholder or loading indicator.

```astro
<div data-fallback>
  <slot />
</div>
```

## How It Works

This integration uses a Vite plugin that runs during the build process to:

1. Parse `.astro` files using the Astro compiler
2. Identify `Fallback` components that don't have a `slot` attribute
3. Automatically add `slot="fallback"` to those components
4. Return the transformed code

The transformation happens at build time, so there's no runtime overhead.

## Requirements

- Astro 4.0.0 or higher
- Node.js 18 or higher

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
