// @ts-check
import awaited from "astro-awaited/setup";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [awaited()],
});
