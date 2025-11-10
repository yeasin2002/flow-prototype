import { resolve } from "pathe";
import type { BuildContext, FlowConfig, ResolvedConfig } from "../types";

export * from "./nitro";
export * from "./vinxi";
export * from "./vite";

export function resolveConfig(config: FlowConfig = {}): ResolvedConfig {
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
  config: FlowConfig,
  mode: "development" | "production" = "development"
): BuildContext {
  return {
    config: resolveConfig(config),
    mode,
  };
}

export async function build(config: FlowConfig) {
  const resolved = resolveConfig(config);
  const { createVinxiApp } = await import("./vinxi");

  console.log("📦 Building @flow app...");
  console.log(`📁 Root: ${resolved.rootDir}`);
  console.log(`📂 Output: ${resolved.outDir}`);

  try {
    const app = createVinxiApp(config);

    // Vinxi handles the build process
    await app.build();

    console.log("✅ Build completed successfully!");
    console.log(`📂 Output directory: ${resolved.outDir}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ Build failed:", error);
    return {
      success: false,
      errors: [error as Error],
    };
  }
}

export async function dev(config: FlowConfig) {
  const resolved = resolveConfig(config);
  const { createVinxiApp } = await import("./vinxi");

  console.log("🚀 Starting @flow dev server...");
  console.log(`📁 Root: ${resolved.rootDir}`);
  console.log(`🌐 Port: ${resolved.port}`);

  try {
    const app = createVinxiApp(config);

    // Start Vinxi dev server
    await app.dev();

    console.log(`✅ Server running at http://localhost:${resolved.port}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error("❌ Failed to start dev server:", error);
    return {
      success: false,
      errors: [error as Error],
    };
  }
}
