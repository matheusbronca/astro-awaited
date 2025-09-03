import { readFileSync } from "fs";
import { transformFallbackComponents } from "./fallback-transformer.js";

import type { TransformOptions } from "../typings/integration.js";
import type { Plugin } from "vite";

export function createPlugin(options: TransformOptions = {}): Plugin {
  const { componentName = "Fallback", slotName = "fallback" } = options;

  return {
    name: "astro-fallback-slot-transformer",
    load(id: string) {
      // Only process .astro files
      if (!id.endsWith(".astro")) {
        return null;
      }

      try {
        // Read the original file content
        const originalCode = readFileSync(id, "utf-8");

        // Transform the code to add slot="fallback" to Fallback components
        const transformedCode = transformFallbackComponents(
          originalCode,
          componentName,
          slotName,
        );

        if (transformedCode !== originalCode) {
          return transformedCode;
        }

        return null; // No transformation needed, let Vite handle normally
      } catch (error) {
        // If transformation fails, let Vite handle normally
        return null;
      }
    },
  };
}
