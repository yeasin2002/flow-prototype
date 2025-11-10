import type { UserConfig as ViteConfig } from "vite";

// Nitro v3 config type (simplified for now)
export interface NitroConfig {
  preset?: string;
  routesDir?: string;
  output?: {
    dir?: string;
  };
  [key: string]: any;
}

export interface FlowConfig {
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

export interface ResolvedConfig extends Required<FlowConfig> {
  // Resolved absolute paths
  rootDir: string;
  outDir: string;
  routesDir: string;
  serverDir: string;
  publicDir: string;
}