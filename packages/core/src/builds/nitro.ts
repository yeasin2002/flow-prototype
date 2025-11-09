import { defineNitroConfig } from "nitropack/config";
import type { @flowConfig } from "../src/types";

export function createNitroConfig(config: @flowConfig) {
  return defineNitroConfig({
    preset: "node-server",

    srcDir: config.serverDir || "app/server",

    output: {
      dir: config.outDir || ".output",
      serverDir: ".output/server",
      publicDir: ".output/public",
    },

    handlers: [
      {
        route: "/**",
        handler: ".output/server/entry.js",
      },
    ],

    devServer: {
      watch: [config.routesDir || "app/routes", config.serverDir || "app/server"],
    },

    experimental: {
      wasm: true,
    },

    ...(config.nitro || {}),
  });
}