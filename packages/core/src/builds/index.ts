import { resolve } from "pathe";
import type { BuildContext, ReactFlowConfig, ResolvedConfig } from "../types";

export * from "./nitro";
export * from "./vinxi";
export * from "./vite";

export function resolveConfig(config: ReactFlowConfig = {}): ResolvedConfig {
  const root = config.root || process.cwd();

  return {
    root,
    rootDir: resolve(root),
    outDir: resolve(root, config.outDir || ".output"),
    routesDir: resolve(root, config.routesDir || "app/routes"),
    serverDir: resolve(root, config.serverDir || "app/server"),
    publicDir: resolve(root, config.publicDir || "public"),
    port: config.port || 3000,
    ssr: config.ssr !== false,
    vite: config.vite || {},
    nitro: config.nitro || {},
  };
}

export function createBuildContext(
  config: ReactFlowConfig,
  mode: "development" | "production" = "development",
): BuildContext {
  return {
    config: resolveConfig(config),
    mode,
  };
}

export async function build(config: ReactFlowConfig) {
  const ctx = createBuildContext(config, "production");

  console.log("Building ReactFlow app...");
  console.log("Config:", ctx.config);

  // TODO: Implement actual build process
  // 1. Generate routes
  // 2. Build client with Vite
  // 3. Build server with Vite
  // 4. Build Nitro server

  return {
    success: true,
  };
}

export async function dev(config: ReactFlowConfig) {
  const ctx = createBuildContext(config, "development");

  console.log("Starting ReactFlow dev server...");
  console.log("Config:", ctx.config);

  // TODO: Implement dev server
  // 1. Start Vinxi dev server
  // 2. Watch for file changes
  // 3. Hot reload

  return {
    success: true,
  };
}