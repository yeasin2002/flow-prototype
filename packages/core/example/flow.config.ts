import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "../dist/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: __dirname,
  port: 3000,
  ssr: true,

  vite: {
    resolve: {
      alias: {
        "@": "./app",
      },
    },
  },

  nitro: {
    preset: "node-server",
  },
});
