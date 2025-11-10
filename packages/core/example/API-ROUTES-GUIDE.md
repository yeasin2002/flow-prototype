# API Routes in @flow

## Current Status

The API router is configured but needs proper implementation. Here's what's happening:

### The Issue

Vinxi's HTTP router expects a single handler file, not a glob pattern. The configuration:

```typescript
{
  name: "api",
  type: "http",
  base: "/api",
  handler: "./app/server/**/*.ts",  // ❌ This doesn't work
  target: "server",
}
```

### The Solution

We created a central API handler that routes to individual files:

```typescript
// app/server/api-handler.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || '';
  
  if (url.startsWith('/api/hello')) {
    const { default: helloHandler } = await import('./routes/hello.js');
    return helloHandler(event);
  }
  
  return { error: 'Not Found', path: url };
});
```

### How to Add New API Routes

1. **Create the route file:**
```typescript
// app/server/routes/users.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    users: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ],
  };
});
```

2. **Add to api-handler.ts:**
```typescript
if (url.startsWith('/api/users')) {
  const { default: usersHandler } = await import('./routes/users.js');
  return usersHandler(event);
}
```

## Better Solution (Future)

Implement automatic route scanning:

```typescript
// Scan app/server/routes/ directory
// Generate routes automatically
// No manual registration needed
```

This is what frameworks like Nitro v3 and Next.js do automatically.

## Testing API Routes

Once the server is running:

```bash
# Test hello endpoint
curl http://localhost:3000/api/hello

# Expected response:
{
  "message": "Hello from @flow API!",
  "timestamp": "2025-01-10T..."
}
```

## Next Steps

1. ✅ API handler created
2. 🚧 Test API endpoint
3. 🚧 Implement automatic route scanning
4. 🚧 Add more API routes
5. 🚧 Add middleware support
