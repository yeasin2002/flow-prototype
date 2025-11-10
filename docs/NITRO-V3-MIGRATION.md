# Nitro v3 Migration Guide

## Overview

Nitro v3 represents a significant architectural shift from v2. The most important change is that **Nitro is now a Vite plugin** rather than a standalone server framework.

## Key Changes

### 1. Package Name

- **v2:** `nitropack`
- **v3:** `nitro`

```bash
# Old (v2)
npm install nitropack

# New (v3)
npm install nitro
```

### 2. Integration Method

**v2: Standalone Configuration**

```typescript
// nitro.config.ts
import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'node-server',
  handlers: [
    { route: '/**', handler: './server/entry.js' }
  ]
})
```

**v3: Vite Plugin**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [
    nitro()
  ],
  nitro: {
    preset: 'node-server'
  }
})
```

### 3. File-Based Routing

Nitro v3 introduces automatic file-based routing for API endpoints:

```
routes/
├── hello.ts          → /hello
├── users/
│   ├── index.ts      → /users
│   └── [id].ts       → /users/:id
└── api/
    └── posts.ts      → /api/posts
```

**Example route:**

```typescript
// routes/hello.ts
import { defineHandler } from 'nitro/h3'

export default defineHandler(() => {
  return { message: 'Hello from Nitro v3!' }
})
```

### 4. Multiple Backend Framework Support

Nitro v3 allows you to use different backend frameworks:

**H3 (Default):**

```typescript
// routes/hello.ts
import { defineHandler } from 'nitro/h3'

export default defineHandler(() => {
  return { api: 'works!' }
})
```

**Hono:**

```typescript
// server.ts
import { Hono } from 'hono'

const app = new Hono()
app.get("/", (c) => c.text('Hello from Hono!'))

export default app
```

**Elysia:**

```typescript
// server.ts
import { Elysia } from 'elysia'

const app = new Elysia()
app.get("/", () => 'Hello from Elysia!')

export default app
```

**Web Standard:**

```typescript
// server.ts
export default {
  async fetch(req: Request): Promise<Response> {
    return new Response(`Hello world! (${req.url})`)
  }
}
```

### 5. Development Experience

**v3 Benefits:**

- ✅ HMR on server routes (instant updates)
- ✅ Unified Vite dev server (no separate processes)
- ✅ Better error messages
- ✅ Faster startup time

### 6. Deployment

Deployment remains similar with zero-config presets:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [nitro()],
  nitro: {
    preset: 'cloudflare' // or 'vercel', 'netlify', etc.
  }
})
```

**Available Presets:**

- `standard` - Standard Node.js
- `cloudflare` - Cloudflare Workers
- `vercel` - Vercel Serverless
- `netlify` - Netlify Functions
- `aws-lambda` - AWS Lambda
- `deno` - Deno Deploy
- And 20+ more!

## Important Notes

### Alpha Status

⚠️ **Nitro v3 is currently in Alpha**

- Not recommended for production use yet
- API may change before stable release
- Use v2 (`nitropack`) for production applications

### SSR Limitations

Nitro v3 focuses on API routes and server functionality. For SSR (Server-Side Rendering), you need to combine it with:

- **Vinxi** - For orchestrating client/server builds
- **React/Vue/Svelte** - For component rendering
- **Custom SSR logic** - For rendering HTML

This is why frameworks like @flow, Nuxt, and TanStack Start use Nitro as part of a larger system.

## Migration Checklist

- [ ] Update package: `nitropack` → `nitro`
- [ ] Move config from `nitro.config.ts` to `vite.config.ts`
- [ ] Update imports: `nitropack/config` → `nitro/vite`
- [ ] Reorganize API routes to `routes/` folder
- [ ] Test HMR on server routes
- [ ] Update deployment configuration
- [ ] Test all deployment presets

## Why This Change?

### Benefits of Vite Plugin Architecture

1. **Unified Dev Server** - One server for frontend and backend
2. **Better HMR** - Instant updates on server code changes
3. **Simplified Config** - Everything in `vite.config.ts`
4. **Ecosystem Integration** - Works with all Vite plugins
5. **Faster Builds** - Leverages Vite's optimizations

### Framework Integration

Nitro v3 is designed to be the foundation for meta-frameworks:

- **Nuxt** - Vue meta-framework
- **SolidStart** - Solid meta-framework
- **TanStack Start** - React meta-framework
- **@flow** - Our React meta-framework

## Resources

- [Nitro v3 Documentation](https://v3.nitro.build/)
- [Nitro v3 GitHub](https://github.com/nitrojs/nitro)
- [Migration Discussion](https://github.com/nitrojs/nitro/discussions)
- [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html)

## Getting Help

- [GitHub Issues](https://github.com/nitrojs/nitro/issues)
- [Discord Community](https://discord.gg/nitro)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nitro)
