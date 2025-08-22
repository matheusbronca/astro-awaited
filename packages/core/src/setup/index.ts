import { AstroIntegration } from "astro";
import { createPlugin } from "./vite-plugin-astro-awaited.js";

import type { TransformOptions } from "../../typings/integration";

export default function createIntegration(
  options: TransformOptions = {},
): AstroIntegration {
  return {
    name: "astro-awaited",
    hooks: {
      "astro:config:setup": ({ updateConfig, logger }) => {
        logger.info("Setting up Awaited/Fallback integration");

        updateConfig({
          vite: {
            plugins: [createPlugin(options)],
          },
        });

        logger.info("Awaited/Fallback integration configured successfully");
      },
    },
  };
}
