import { defineConfig, resolveConfig } from "./src/index";

const config = defineConfig({
  root: process.cwd(),
  port: 3000,
});

const resolved = resolveConfig(config);
console.log("Resolved config:", resolved);