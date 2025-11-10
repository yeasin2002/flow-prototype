# @flow/core

The core package for the @flow React meta-framework.

## Installation

```bash
pnpm add @flow/core react react-dom react-router-dom
```

## Quick Start

### 1. Create Configuration

```typescript
// flow.config.ts
import { defineConfig } from "@flow/core";

export default defineConfig({
  root: __dirname,
  port: 3000,
  ssr: true,
});
```

### 2. Create App Structure

```
your-app/
├── app/
│   ├── routes/           # Frontend routes
│   │   └── Home.tsx
│   ├── server/
│   │   └── routes/       # API routes
│   │       └── hello.ts
│   ├── App.tsx
│   ├── entry-client.tsx
│   └── entry-server.tsx
├── flow.config.ts
└── package.json
```

### 3. Create Entry Points

**app/entry-client.tsx:**

```typescript
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

**app/entry-server.tsx:**

```typescript
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { defineEventHandler } from 'h3';
import App from './App';

export default defineEventHandler((event) => {
  const url = event.node.req.url || '/';
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  return `<!DOCTYPE html>
    <html>
      <head><title>@flow App</title></head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/@id/__x00__virtual:vinxi/client"></script>
      </body>
    </html>`;
});
```

### 4. Run Development Server

```typescript
// dev.ts
import { dev } from "@flow/core";
import config from "./flow.config";

dev(config);
```

```bash
tsx dev.ts
```

## API

### `defineConfig(config: @flowConfig)`

Define framework configuration.

### `dev(config: @flowConfig)`

Start development server with HMR.

### `build(config: @flowConfig)`

Build for production.

## Configuration Options

```typescript
interface @flowConfig {
  root?: string;           // Root directory (default: process.cwd())
  outDir?: string;         // Output directory (default: '.output')
  routesDir?: string;      // Routes directory (default: 'app/routes')
  serverDir?: string;      // Server directory (default: 'app/server')
  publicDir?: string;      // Public assets (default: 'public')
  port?: number;           // Dev server port (default: 3000)
  ssr?: boolean;           // Enable SSR (default: true)
  vite?: ViteConfig;       // Vite configuration
  nitro?: NitroConfig;     // Nitro configuration
}
```

## Example

See the `example/` directory for a complete working example.

## Architecture

@flow is built on:

- **Vite** - Fast bundler and dev server
- **Nitro v3** - Universal server (Vite plugin)
- **Vinxi** - Multi-build orchestration
- **React 19** - UI library

## License

MIT
