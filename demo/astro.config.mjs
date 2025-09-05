// @ts-check
import awaited from "astro-awaited";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [awaited()],
});
