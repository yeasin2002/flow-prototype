import type { NitroConfig } from "nitropack";
import type { UserConfig as ViteConfig } from "vite";

export interface ReactFlowConfig {
  /**
   * Root directory of the application
   * @default process.cwd()
   */
  root?: string;

  /**
   * Output directory for build
   * @default '.output'
   */
  outDir?: string;

  /**
   * Routes directory
   * @default 'app/routes'
   */
  routesDir?: string;

  /**
   * Server directory
   * @default 'app/server'
   */
  serverDir?: string;

  /**
   * Public directory for static assets
   * @default 'public'
   */
  publicDir?: string;

  /**
   * Vite configuration
   */
  vite?: ViteConfig;

  /**
   * Nitro configuration
   */
  nitro?: NitroConfig;

  /**
   * Server port
   * @default 3000
   */
  port?: number;

  /**
   * Enable SSR
   * @default true
   */
  ssr?: boolean;
}

export interface ResolvedConfig extends Required<ReactFlowConfig> {
  // Resolved absolute paths
  rootDir: string;
  outDir: string;
  routesDir: string;
  serverDir: string;
  publicDir: string;
}