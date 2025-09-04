<div align="center">
  <img width="128" src="https://github.com/matheusbronca/astro-awaited/raw/main/public/icon.jpg" alt="Astro Awaited - An Astro Integration" />
  <h1>⚡ Astro Awaited Integration</h1>
  <p>
    Supercharge your Astro app with **automagic lazy-loaded components** powered by <strong>HTML streaming</strong>. This integration enables you to render fallback placeholders while server-side data is being fetched — <strong>even before the page fully loads</strong>, and <strong>without requiring JavaScript on modern browsers</strong>.
  </p>
  <img src="https://raw.githubusercontent.com/matheusbronca/astro-awaited/main/public/example.gif" alt="Astro Awaited - An Astro Integration" />
</div>

## ✨ Features

- 🚀 **Zero JavaScript (Modern Browsers)**  
  Emulates React’s `Suspense` behavior—even with JavaScript disabled.

  - JavaScript is required for smooth exit transitions when using Astro’s View Transitions (`ClientRouter`).
  - JavaScript is required to polyfill behavior on legacy browsers.

- 🎯 **Zero Configuration**  
  Works out of the box with sensible defaults.

- 🔧 **Customizable Transitions**  
  Configure transition duration and easing for awaited components.

- 📦 **TypeScript Support**  
  Full type definitions included.

- ⚡ **Fast Build-Time Performance**  
  Minimal overhead with efficient AST transformations.

## 📋 Requirements

- **HTML Streaming must be enabled** on the server.  
  Without streaming, this integration won’t work.

- **Astro v4.0.0+** and **Node.js v18+**

## ⚠️ Limitations

Even though `astro-awaited` is designed to be intuitive, there are a few important caveats and best practices to keep in mind:

- ⚠️**Works Only with .astro Components**
  Awaited is compatible only with `.astro` components. You can nest it inside an Astro Island to enable hydration later, but:

  - The Awaited component itself must remain in a `.astro` file
  - Do not use the `client:only` directive, as it **disables server-side rendering and breaks HTML streaming**

- 🧱 **Streaming is top-to-bottom**:  
  Each awaited component blocks the stream until its data is fetched. Structure your layout to avoid bottlenecks.

- ⛔ **Don’t Fetch in Page Frontmatter**:  
  Fetching data in the page frontmatter blocks the entire page from rendering, including fallbacks. Instead, move fetch logic into individual components to leverage streaming effectively.  
  [Learn more in Astro’s official guide](https://docs.astro.build/en/recipes/streaming-improve-page-performance/).

- 🚫 **No HOC (Higher-Order Components)**:  
  Astro Awaited relies on HTML streaming and Astro’s `slot` feature. Wrapping awaited logic in a separate component will break fallback behavior.

### ❌ Incorrect Usage

```astro
---
// ResultsListAwaited.astro
import { Awaited, Fallback } from 'astro-awaited';
import ResultsList from './ResultsList.astro';
---

<Awaited>
  <ResultsList query={searchQuery} page={searchPage} />
  <Fallback>
    <p>Loading...</p>
  </Fallback>
</Awaited>
```

```astro
---
// index.astro
import ResultsListAwaited from './ResultsListAwaited.astro';
---

<Layout>
  <h1>My results list</h1>
  <ResultsListAwaited />
</Layout>
```

This won’t work—Astro will treat `ResultsListAwaited` as an async component and begin fetching before rendering its children.

### ✅ Correct Usage

```astro
---
// index.astro
import { Awaited, Fallback } from 'astro-awaited';
import ResultsList from './ResultsList.astro';
---

<Layout>
  <h1>My results list</h1>
  <Awaited>
    <ResultsList query={searchQuery} page={searchPage} />
    <Fallback>
      <p>Loading...</p>
    </Fallback>
  </Awaited>
</Layout>
```

Use `Awaited` declaratively, directly in your page layout.

## 📦 Installation

```bash
npm install astro-awaited
```

## 🚀 Usage

### 1. Add the integration to your Astro config

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import awaited from "astro-awaited";

export default defineConfig({
  integrations: [awaited()],
});
```

### 2. Use Awaited and Fallback in your components

```astro
---
// SearchPage.astro
import { Awaited, Fallback } from 'astro-awaited';
import ResultsList from './ResultsList.astro';
---

<Awaited>
  <ResultsList query={searchQuery} page={searchPage} />
  <Fallback>
    <p>Loading...</p>
  </Fallback>
</Awaited>
```

## 🧩 Components

### `<Awaited>`

Wraps an async component and conditionally renders its content or a fallback.

### `<Fallback>`

Defines the placeholder UI shown while data is loading.

## 🛠️ How It Works

Astro Awaited uses a Vite plugin during build time to:

1. Parse `.astro` files via the Astro compiler.
2. Detect `Fallback` components missing a `slot` attribute.
3. Automatically inject `slot="fallback"` into those components.
4. Return the transformed code.

✅ All transformations happen at build time—no runtime overhead.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
