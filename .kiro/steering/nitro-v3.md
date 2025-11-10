# Nitro v3 Guidelines

## Critical Information

**Nitro v3 is now a Vite plugin**, not a standalone server framework. This is a fundamental architectural change from v2.

### Package Details

- **Package name:** `nitro` (NOT `nitropack`)
- **Version:** ^3.0.0-alpha.4 (Alpha - not production ready)
- **Documentation:** https://v3.nitro.build/
- **GitHub:** https://github.com/nitrojs/nitro
- **NPM:** https://www.npmjs.com/package/nitro

### Integration in @flow Framework

In the @flow framework, we use Vinxi to orchestrate builds, which internally uses Nitro v3:

```typescript
// packages/core/src/builds/vinxi.ts
import { createApp } from "vinxi";
import { createViteConfig } from "./vite";

export function createVinxiApp(config: FlowConfig) {
  return createApp({
    routers: [
      {
        name: "client",
        type: "client",
        handler: "./app/entry-client.tsx",
        target: "browser",
        plugins: () => createViteConfig(config, "client"),
      },
      {
        name: "ssr",
        type: "http",
        handler: "./app/entry-server.tsx",
        target: "server",
        plugins: () => createViteConfig(config, "server"),
      },
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
```

### Nitro Configuration in @flow

```typescript
// packages/core/src/builds/nitro.ts
export function createNitroConfig(config: FlowConfig) {
  return {
    preset: config.nitro?.preset || "node-server",
    routesDir: config.serverDir || "app/server/routes",
    output: {
      dir: config.outDir || ".output",
    },
    ...(config.nitro || {}),
  };
}
```

### File-Based Routing

Nitro v3 provides automatic file-based routing for API endpoints:

```
app/server/routes/
├── hello.ts          → /api/hello
├── users/
│   ├── index.ts      → /api/users
│   └── [id].ts       → /api/users/:id
```

**Example API Route:**

```typescript
// app/server/routes/hello.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    message: 'Hello from @flow API!',
    timestamp: new Date().toISOString(),
  };
});
```

### Multiple Backend Frameworks Support

Nitro v3 supports multiple backend frameworks:

- **H3** (default) - `import { defineEventHandler } from 'h3'`
- **Hono** - `import { Hono } from 'hono'`
- **Elysia** - `import { Elysia } from 'elysia'`
- **Web Standard** - Standard `fetch` API

### Type System

**IMPORTANT:** Use `FlowConfig` not `@flowConfig` (@ is not valid in TypeScript identifiers)

```typescript
import type { FlowConfig } from "@flow/core";

const config: FlowConfig = {
  root: __dirname,
  port: 3000,
  ssr: true,
};
```

### Important Notes

1. **Alpha Status:** Nitro v3 is in Alpha - not recommended for production yet
2. **No Standalone SSR:** Nitro v3 doesn't handle React SSR directly - we use Vinxi for orchestration
3. **Vite-Native:** Seamlessly integrates with Vite's build system
4. **HMR Support:** Server routes have instant HMR during development
5. **Breaking Changes:** v3 is significantly different from v2 (nitropack)

### When Writing Code for @flow

- Use `FlowConfig` interface for configuration types
- Import from `h3` for event handlers: `import { defineEventHandler } from 'h3'`
- Place API routes in `app/server/routes/` directory
- Use Vinxi's `createApp` for multi-router orchestration
- Configure Nitro through the `nitro` property in `FlowConfig`

### Deployment Presets

Zero-config deployment to 20+ platforms:

- `node-server` or `standard` - Node.js
- `cloudflare` - Cloudflare Workers
- `vercel` - Vercel Serverless
- `netlify` - Netlify Functions
- `aws-lambda` - AWS Lambda
- `deno` - Deno Deploy
- And more...

### Current Implementation Status

✅ **Completed:**
- Core package built with Nitro v3
- Type system fixed (FlowConfig)
- Vinxi integration working
- Example app with SSR and API routes
- Documentation updated

🚧 **In Progress:**
- Route scanning and generation
- Server function RPC system
- Advanced routing features

### Common Patterns in @flow

**1. Creating Server Routes:**
```typescript
// app/server/routes/users.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // Handle request
  return { success: true };
});
```

**2. Configuration:**
```typescript
// flow.config.ts
import { defineConfig } from '@flow/core';

export default defineConfig({
  root: __dirname,
  port: 3000,
  ssr: true,
  nitro: {
    preset: 'node-server',
  },
});
```

**3. Development:**
```typescript
// dev.ts
import { dev } from '@flow/core';
import config from './flow.config';

dev(config);
```

### Resources

- [Nitro v3 Docs](https://v3.nitro.build/)
- [Nitro v3 GitHub](https://github.com/nitrojs/nitro)
- [Migration Guide](../../docs/NITRO-V3-MIGRATION.md)
- [H3 Documentation](https://h3.unjs.io/)
- [Vinxi Documentation](https://vinxi.vercel.app/)
