import { defineConfig } from "../src";

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
