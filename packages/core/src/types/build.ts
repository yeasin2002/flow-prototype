export interface BuildContext {
  config: ResolvedConfig;
  mode: "development" | "production";
}

export interface BuildResult {
  success: boolean;
  errors?: Error[];
  warnings?: string[];
}