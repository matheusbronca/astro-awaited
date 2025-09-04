import { AstroIntegration } from "astro";
import { createPlugin } from "./vite-plugin-astro-awaited.js";

import type { TransformOptions } from "../typings/integration.js";

export default function createIntegration(
  options: TransformOptions = {},
): AstroIntegration {
  return {
    name: "astro-awaited",
    hooks: {
      "astro:config:setup": ({ updateConfig, logger }) => {
        logger.info("Setting up Astro Awaited integration");

        updateConfig({
          vite: {
            plugins: [createPlugin(options)],
          },
        });

        logger.info("Astro Awaited integration configured successfully");
      },
    },
  };
}
