# Nitro v3 Guidelines

## Key Information

**Nitro v3 is now a Vite plugin**, not a standalone server framework.

### Package Details

- **Package name:** `nitro` (not `nitropack`)
- **Version:** ^3.x (Alpha - not production ready)
- **Documentation:** https://v3.nitro.build/
- **GitHub:** https://github.com/nitrojs/nitro

### Integration

Always use Nitro as a Vite plugin:

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [nitro()],
  nitro: {
    preset: "node-server",
  },
});
```

### File-Based Routing

Nitro v3 provides automatic file-based routing for API endpoints in the `routes/` folder:

```
routes/
├── hello.ts          → /hello
├── users/
│   ├── index.ts      → /users
│   └── [id].ts       → /users/:id
```

### Multiple Backend Frameworks

Nitro v3 supports multiple backend frameworks:

- **H3** (default) - `import { defineHandler } from 'nitro/h3'`
- **Hono** - `import { Hono } from 'hono'`
- **Elysia** - `import { Elysia } from 'elysia'`
- **Web Standard** - Standard `fetch` API

### Important Notes

1. **Alpha Status:** Nitro v3 is in Alpha - not recommended for production
2. **No Standalone SSR:** Nitro v3 doesn't handle SSR directly - use with Vinxi for full-stack apps
3. **Vite-Native:** Designed to work seamlessly with Vite's build system
4. **HMR Support:** Server routes have instant HMR during development

### When Writing Code

- Always import from `nitro/vite` for the plugin
- Use `nitro/h3` for H3 utilities
- Configure in `vite.config.ts`, not a separate `nitro.config.ts`
- Place API routes in `routes/` folder for automatic registration

### Deployment

Zero-config deployment to 20+ platforms:

- `standard` - Node.js
- `cloudflare` - Cloudflare Workers
- `vercel` - Vercel Serverless
- `netlify` - Netlify Functions
- And more...
