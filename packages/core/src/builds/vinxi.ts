import react from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import type { FlowConfig } from "../types";

export function createVinxiApp(config: FlowConfig) {
  return createApp({
    routers: [
      // Client router - Browser bundle
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        target: "browser",
        base: "/_build",
        plugins: () => [
          react({
            jsxRuntime: "automatic",
          }),
        ],
      },

      // SSR router - Server-side rendering
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        target: "server",
        plugins: () => [
          react({
            jsxRuntime: "automatic",
          }),
        ],
      },

      // API router - Backend routes
      {
        name: "api",
        type: "http",
        base: "/api",
        handler: "./app/server/**/*.ts",
        target: "server",
      },
    ],
  });
}

export function defineConfig(config: FlowConfig) {
  return config;
}
