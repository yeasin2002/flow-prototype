# API Reference

Complete API reference for @flow framework.

---

## Core

### defineConfig

Define framework configuration.

```typescript
import { defineConfig } from "@@flow/core";

export default defineConfig({
  port: 3000,
  ssr: true,
  routesDir: "app/routes",
  serverDir: "app/server",
  publicDir: "public",
});
```

**Parameters:**

- `config: @flowConfig` - Configuration object

**Returns:** `@flowConfig`

---

### build

Build application for production.

```typescript
import { build } from "@@flow/core";

await build({
  minify: true,
  sourcemap: false,
});
```

**Parameters:**

- `options: BuildOptions` - Build options

**Returns:** `Promise<BuildResult>`

---

### dev

Start development server.

```typescript
import { dev } from "@@flow/core";

await dev({
  port: 3000,
  host: "localhost",
});
```

**Parameters:**

- `options: DevOptions` - Dev server options

**Returns:** `Promise<DevServer>`

---

## Server Functions

### createServerFn

Create a type-safe server function.

```typescript
import { createServerFn } from "@@flow/server";

export const getUser = createServerFn(async (ctx, id: number) => {
  const user = await db.users.findById(id);
  return user;
});
```

**Parameters:**

- `fn: (ctx: ServerFunctionContext, ...args: any[]) => Promise<any>` - Server function
- `options?: ServerFunctionOptions` - Optional configuration

**Returns:** `ServerFunction`

---

### useServerQuery

Hook for querying server functions.

```typescript
import { useServerQuery } from "@@flow/server";
import { getUser } from "../server/users";

const { data, loading, error, refetch } = useServerQuery(getUser, [userId]);
```

**Parameters:**

- `fn: ServerFunction` - Server function to call
- `args: any[]` - Arguments to pass

**Returns:**

```typescript
{
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```

---

### useServerFn

Hook for calling server functions (mutations).

```typescript
import { useServerFn } from "@@flow/server";
import { createUser } from "../server/users";

const { execute, loading, error } = useServerFn(createUser);

await execute({ name: "John", email: "john@example.com" });
```

**Parameters:**

- `fn: ServerFunction` - Server function to call

**Returns:**

```typescript
{
  execute: (...args: any[]) => Promise<T>;
  loading: boolean;
  error: Error | null;
}
```

---

## Router

### Routes

File-based routing conventions:

| File                    | Route              |
| ----------------------- | ------------------ |
| `index.tsx`             | `/`                |
| `about.tsx`             | `/about`           |
| `users/[id].tsx`        | `/users/:id`       |
| `docs/[...slug].tsx`    | `/docs/*`          |
| `shop/[[category]].tsx` | `/shop/:category?` |

---

### useParams

Get route parameters.

```typescript
import { useParams } from "react-router-dom";

const { id } = useParams<{ id: string }>();
```

**Returns:** `Params`

---

### useNavigate

Navigate programmatically.

```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
navigate("/dashboard");
```

**Returns:** `NavigateFunction`

---

### useLocation

Get current location.

```typescript
import { useLocation } from "react-router-dom";

const location = useLocation();
console.log(location.pathname);
```

**Returns:** `Location`

---

### Link

Navigate with Link component.

```typescript
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

**Props:**

- `to: string` - Target path
- `replace?: boolean` - Replace history entry
- `state?: any` - State to pass

---

## Configuration Types

### @flowConfig

```typescript
interface @flowConfig {
  root?: string;
  outDir?: string;
  routesDir?: string;
  serverDir?: string;
  publicDir?: string;
  port?: number;
  ssr?: boolean;
  vite?: ViteConfig;
  nitro?: NitroConfig;
}
```

---

### ServerFunctionContext

```typescript
interface ServerFunctionContext {
  request: Request;
  response: Response;
  headers: Headers;
  locals: Record<string, any>;
}
```

---

## CLI Commands

### @flow dev

Start development server.

```bash
@flow dev [options]

Options:
  -p, --port <port>    Port number (default: 3000)
  -h, --host <host>    Host address (default: localhost)
  --open               Open browser automatically
```

---

### @flow build

Build for production.

```bash
@flow build [options]

Options:
  --no-minify          Disable minification
  --sourcemap          Generate source maps
  --analyze            Analyze bundle size
```

---

### @flow start

Start production server.

```bash
@flow start [options]

Options:
  -p, --port <port>    Port number (default: 3000)
```

---

### @flow create

Create new project.

```bash
@flow create [name] [options]

Options:
  --template <name>    Template to use (basic, blog, ecommerce)
  --pm <manager>       Package manager (pnpm, npm, yarn)
```

---

## Environment Variables

### Built-in Variables

- `NODE_ENV` - Environment (development, production)
- `PORT` - Server port
- `HOST` - Server host

### Custom Variables

Access in server functions:

```typescript
const apiKey = process.env.API_KEY;
```

Access in client (must be prefixed with `VITE_`):

```typescript
const publicKey = import.meta.env.VITE_PUBLIC_KEY;
```

---

## Error Handling

### Error Types

```typescript
class ValidationError extends Error {
  constructor(
    public field: string,
    message: string,
  ) {
    super(message);
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
  }
}
```

---

## Middleware

### Create Middleware

```typescript
import type { Middleware } from "@@flow/core/middleware";

export const authMiddleware: Middleware = {
  name: "auth",
  handler: async (ctx, next) => {
    // Check authentication
    const token = ctx.request.headers.get("Authorization");

    if (!token) {
      throw new Error("Unauthorized");
    }

    // Add user to context
    ctx.locals.user = await verifyToken(token);

    await next();
  },
};
```

---

## Caching

### withCache

Cache server function results.

```typescript
import { withCache } from "@@flow/server/cache";

export const getData = createServerFn(async (ctx) => {
  return withCache(
    async () => {
      return await expensiveOperation();
    },
    { key: "data", ttl: 300 },
  );
});
```

**Parameters:**

- `fn: () => Promise<T>` - Function to cache
- `options: CacheOptions` - Cache configuration

---

### clearCache

Clear cached data.

```typescript
import { clearCache } from "@@flow/server/cache";

clearCache("data"); // Clear specific key
clearCache(); // Clear all
```

---

## TypeScript

### Type Inference

Server functions are fully typed:

```typescript
// Server
export const getUser = createServerFn(async (ctx, id: number) => {
  return { id, name: "John", email: "john@example.com" };
});

// Client - types are inferred!
const { data } = useServerQuery(getUser, [123]);
// data is typed as { id: number; name: string; email: string; } | null
```

---

## Next Steps

- [Examples](./examples/) - Real-world examples
- [Tutorial](../tutorial/README.md) - Build from scratch
- [FAQ](./faq.md) - Common questions
