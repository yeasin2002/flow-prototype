import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin, type UserConfig } from "vite";
import type { @flowConfig } from "../src/types";

export function createViteConfig(config: @flowConfig, target: "client" | "server"): UserConfig {
  const isClient = target === "client";

  return defineConfig({
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
      ...create@flowPlugins(config, target),
    ],

    resolve: {
      alias: {
        "@": config.root || process.cwd(),
      },
    },

    build: {
      target: isClient ? "es2020" : "node20",
      outDir: isClient ? ".output/public" : ".output/server",
      ssr: !isClient,
      rollupOptions: {
        external: isClient ? [] : ["react", "react-dom"],
      },
    },

    ssr: {
      noExternal: isClient ? [] : ["react", "react-dom"],
    },

    ...(config.vite || {}),
  });
}

function create@flowPlugins(config: @flowConfig, target: "client" | "server"): Plugin[] {
  const plugins: Plugin[] = [];

  // Add route generation plugin
  plugins.push(createRoutePlugin(config));

  // Add server function plugin for client
  if (target === "client") {
    plugins.push(createServerFunctionPlugin());
  }

  return plugins;
}

function createRoutePlugin(config: @flowConfig): Plugin {
  return {
    name: "@flow:routes",
    configResolved() {
      // TODO: Scan routes directory and generate route manifest
      console.log("Scanning routes...");
    },
  };
}

function createServerFunctionPlugin(): Plugin {
  return {
    name: "@flow:server-functions",
    transform(code, id) {
      // TODO: Transform server function calls to RPC
      return code;
    },
  };
}