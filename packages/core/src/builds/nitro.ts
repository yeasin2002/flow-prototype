import type { FlowConfig } from "../types";

/**
 * Nitro v3 Configuration
 * Note: Nitro v3 is now a Vite plugin
 */
export function createNitroConfig(config: FlowConfig) {
  return {
    preset: config.nitro?.preset || "node-server",

    // Routes directory for file-based routing
    routesDir: config.serverDir || "app/server/routes",

    // Output configuration
    output: {
      dir: config.outDir || ".output",
    },

    ...(config.nitro || {}),
  };
}
