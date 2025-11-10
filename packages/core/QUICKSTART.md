# @flow Quick Start Guide

Get your @flow React meta-framework running in 5 minutes!

## Prerequisites

- Node.js >= 20
- pnpm >= 8

## Step 1: Build the Core Package

```bash
cd packages/core
pnpm install
pnpm build
```

This will:

- Install all dependencies
- Build the @flow/core package
- Generate TypeScript definitions

## Step 2: Run the Example App

```bash
cd example
pnpm install
pnpm dev
```

The development server will start at `http://localhost:3000`

## What You'll See

- **Home Page** (`/`) - Server-side rendered React page
- **About Page** (`/about`) - Another SSR page with routing
- **API Endpoint** (`/api/hello`) - Server function example

## Testing the Framework

### 1. Test SSR

Open `http://localhost:3000` and view the page source. You'll see the HTML is fully rendered on the server!

### 2. Test Client Hydration

Click the navigation links. The page updates without a full reload - that's client-side hydration working!

### 3. Test API Routes

```bash
curl http://localhost:3000/api/hello
```

You'll get a JSON response from the server function.

### 4. Test HMR

Edit `example/app/routes/Home.tsx` and save. The page updates instantly without losing state!

## Project Structure

```
packages/core/
├── src/                  # Framework source code
│   ├── builds/          # Build system (Vinxi, Vite, Nitro)
│   ├── runtime/         # Runtime templates
│   └── types/           # TypeScript types
├── example/             # Example application
│   ├── app/
│   │   ├── routes/      # Frontend pages
│   │   ├── server/      # Backend API
│   │   ├── App.tsx
│   │   ├── entry-client.tsx
│   │   └── entry-server.tsx
│   ├── flow.config.ts   # Configuration
│   ├── dev.ts           # Dev server
│   └── build.ts         # Production build
└── dist/                # Built package
```

## Common Issues

### Port Already in Use

Change the port in `example/flow.config.ts`:

```typescript
export default defineConfig({
  port: 4000, // Change to any available port
});
```

### Build Errors

Make sure you've built the core package first:

```bash
cd packages/core
pnpm build
```

### Module Not Found

Install dependencies in both locations:

```bash
# Core package
cd packages/core
pnpm install

# Example app
cd example
pnpm install
```

## Next Steps

1. **Add More Routes** - Create new files in `example/app/routes/`
2. **Add API Endpoints** - Create files in `example/app/server/routes/`
3. **Customize Styling** - Add your favorite CSS solution
4. **Build for Production** - Run `pnpm build` in the example directory

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           @flow Framework               │
├─────────────────────────────────────────┤
│                                         │
│  Vite   →  Build tool + dev server      │
│  Nitro  →  Server (Vite plugin)         │
│  Vinxi  →  Multi-build orchestration    │
│  React  →  UI library                   │
│                                         │
└─────────────────────────────────────────┘
```

**Vite** provides instant HMR and optimized builds  
**Nitro v3** extends Vite with server capabilities  
**Vinxi** orchestrates client/server builds  
**React 19** renders on server and hydrates on client

## Learn More

- [Full Documentation](../../docs/)
- [Architecture Guide](../../docs/build-framework/01-Architecture.md)
- [Tech Stack Details](../../docs/build-framework/02-Tech-Stack.md)
- [Nitro v3 Migration](../../docs/NITRO-V3-MIGRATION.md)

## Getting Help

- Check the [documentation](../../docs/)
- Review the [example app](./example/)
- Read the [steering rules](../../.kiro/steering/)

Happy coding! 🚀
