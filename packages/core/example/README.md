# @flow Example App

A basic example application demonstrating the @flow React meta-framework.

## Features

- ✅ Server-Side Rendering (SSR)
- ✅ Client-Side Hydration
- ✅ File-Based Routing
- ✅ API Routes
- ✅ Hot Module Replacement (HMR)

## Getting Started

### 1. Install Dependencies

```bash
cd packages/core
pnpm install
```

### 2. Build the Core Package

```bash
pnpm build
```

### 3. Run the Example

```bash
cd example
pnpm install
pnpm dev
```

The app will be running at `http://localhost:3000`

## Project Structure

```
example/
├── app/
│   ├── routes/           # Frontend routes
│   │   ├── Home.tsx      # Home page
│   │   └── About.tsx     # About page
│   ├── server/
│   │   └── routes/       # API routes
│   │       └── hello.ts  # /api/hello endpoint
│   ├── App.tsx           # Root component
│   ├── entry-client.tsx  # Client entry point
│   └── entry-server.tsx  # Server entry point
├── flow.config.ts        # Framework configuration
├── dev.ts                # Dev server script
└── build.ts              # Build script
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production

## API Routes

The example includes an API route at `/api/hello`:

```bash
curl http://localhost:3000/api/hello
```

Response:

```json
{
  "message": "Hello from @flow API!",
  "timestamp": "2025-01-10T..."
}
```

## How It Works

1. **Vinxi** orchestrates multiple builds (client, server, API)
2. **Vite** bundles the React application with HMR
3. **Nitro v3** (as a Vite plugin) handles server routes and API endpoints
4. **React** renders on the server and hydrates on the client

## Next Steps

- Add more routes in `app/routes/`
- Create API endpoints in `app/server/routes/`
- Customize the configuration in `flow.config.ts`
- Add styling with your favorite CSS solution
