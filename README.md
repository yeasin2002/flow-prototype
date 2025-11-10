# @flow

**A modern full-stack React meta-framework for building high-performance web applications**

@flow combines the power of Vite, Nitro, and Vinxi to deliver a seamless development experience with production-grade performance. Built for developers who want the flexibility of React with the convenience of modern meta-frameworks.

---

## ✨ Features

- **🚀 Server-Side Rendering** - React 19 with streaming support for optimal performance
- **⚡ Hybrid Rendering** - Mix server and client components for the best of both worlds
- **📁 File-Based Routing** - Intuitive routing for both frontend pages and API endpoints
- **🔒 Type-Safe Server Functions** - End-to-end type safety with zero boilerplate RPC
- **🌊 Progressive Streaming** - Stream HTML as it's generated for faster perceived load times
- **🖼️ Image Optimization** - Automatic image processing and optimization
- **🌍 Universal Deployment** - Deploy anywhere - Node.js, Edge, Serverless, or Docker
- **📘 TypeScript First** - Built with TypeScript for complete type safety
- **🛠️ Modern DX** - Lightning-fast HMR, intuitive CLI, and excellent debugging


## 🚀 Quick Start

### Try the Example App

The fastest way to see @flow in action:

```bash
# Navigate to the core package
cd packages/core

# Install dependencies
pnpm install

# Build the core package
pnpm build

# Run the example app
cd example
pnpm install
pnpm dev
```

Your app is now running at `http://localhost:3000` 🎉

### Create Your Own App

```bash
# Install @flow core
pnpm add @flow/core react react-dom react-router-dom

# Install dev dependencies
pnpm add -D typescript @types/react @types/react-dom vite

# Create your app structure (see example/ for reference)
```

**Note:** CLI tool (`create-@flow`) is coming soon!

## 📖 Core Concepts

### File-Based Routing

Routes are automatically generated from your file structure:

```
app/routes/
├── index.tsx          → /
├── about.tsx          → /about
├── blog/
│   ├── index.tsx      → /blog
│   └── [slug].tsx     → /blog/:slug
└── users/
    └── [id].tsx       → /users/:id
```

### Server Functions

Write backend logic with full type safety:

```typescript
// app/server/users.ts
import { createServerFn } from '@flow/server';

export const getUser = createServerFn(async (id: string) => {
  const user = await db.users.findById(id);
  return user;
});

// app/routes/users/[id].tsx
import { getUser } from '../../server/users';

export default function UserPage() {
  const { id } = useParams();
  const { data: user } = useServerQuery(getUser, [id]);
  
  return <div>{user.name}</div>;
}
```

### Hybrid Rendering

Mix server and client components seamlessly:

```typescript
// Server Component (runs on server only)
export default async function UserList() {
  const users = await db.users.findMany();
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Client Component (runs in browser)
'use client';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## 🏗️ Architecture

@flow is built on three powerful technologies:

```
┌─────────────────────────────────────────┐
│           @flow Framework               │
├─────────────────────────────────────────┤
│                                         │
│  Vite   →  Build tool + dev server      │
│  Nitro  →  Server (Vite plugin)         │
│  Vinxi  →  Multi-build orchestration    │
│                                         │
└─────────────────────────────────────────┘
```

**Vite** provides instant HMR during development and highly optimized production builds.

**Nitro v3** extends Vite with production-ready server capabilities as a plugin, enabling file-based API routes and universal deployment.

**Vinxi** orchestrates separate client and server builds, ensuring optimal code splitting and bundle sizes.

## 🛠️ CLI Commands

```bash
# Development
pnpm dev              # Start dev server with HMR
pnpm dev --port 4000  # Custom port

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Utilities
pnpm lint             # Lint your code
pnpm format           # Format with Prettier
pnpm type-check       # TypeScript validation
```

## ⚙️ Configuration

Configure @flow with `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import { nitro } from 'nitro/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    nitro()
  ],
  
  // Nitro configuration
  nitro: {
    preset: 'node-server', // or 'cloudflare', 'vercel', etc.
  },
  
  // Vite configuration
  resolve: {
    alias: {
      '@': './app',
    },
  },
  
  server: {
    port: 3000,
  },
});
```

## 🌍 Deployment

@flow supports universal deployment out of the box:

```bash
# Node.js
pnpm build --preset node-server

# Cloudflare Workers
pnpm build --preset cloudflare

# Vercel Serverless
pnpm build --preset vercel

# Netlify Functions
pnpm build --preset netlify

# Docker
pnpm build --preset node-server
docker build -t my-app .
```

## 🤝 Comparison

| Feature                 | @flow     | Next.js      | TanStack Start | Remix |
| ----------------------- | --------- | ------------ | -------------- | ----- |
| SSR                     | ✅        | ✅           | ✅             | ✅    |
| File Routing            | ✅        | ✅           | ✅             | ✅    |
| Server Functions        | ✅        | ✅ (Actions) | ✅             | ✅    |
| Streaming               | ✅        | ✅           | ✅             | ✅    |
| Universal Deployment    | ✅        | ⚠️           | ✅             | ⚠️    |
| Build Tool              | Vite      | Turbopack    | Vite           | esbuild |
| Type-Safe RPC           | ✅        | ⚠️           | ✅             | ❌    |

## 💡 Design Philosophy

@flow is built on these core principles:

**Developer Experience First** - Intuitive APIs, excellent error messages, and fast feedback loops make development enjoyable.

**Performance by Default** - Automatic code splitting, streaming SSR, and optimized builds ensure your apps are fast without extra configuration.

**Type Safety Throughout** - End-to-end TypeScript support from server functions to client components eliminates entire classes of bugs.

**Universal Deployment** - Write once, deploy anywhere. @flow adapts to your infrastructure, not the other way around.

**Minimal Magic** - Explicit conventions over hidden abstractions. You should understand what your framework is doing.

**Progressive Enhancement** - Apps work without JavaScript and enhance when it loads, ensuring accessibility and resilience.

## 🎯 Project Vision

@flow is an exploration of modern full-stack React architecture. It's built to understand how meta-frameworks work under the hood - from build orchestration to server-side rendering to universal deployment.

This project combines the best ideas from Next.js, TanStack Start, and Nuxt while leveraging cutting-edge tools like Vite 7, Vinxi, and Nitro v3. The goal is to create a framework that's both powerful and understandable, production-capable yet educational.

**What makes @flow unique:**

- **Vite 7-powered** - Leverage Vite's speed and ecosystem instead of custom bundlers
- **Nitro v3-based** - True universal deployment to any platform (as Vite plugin)
- **Type-safe RPC** - Server functions with zero boilerplate and full type safety
- **Transparent** - Clear architecture that you can learn from and extend
- **Educational** - Comprehensive documentation explaining every design decision

This is a learning project that aims to become production-ready. It's for developers who want to understand how modern frameworks work, who value flexibility and control, and who believe that the best way to learn is by building.

### Current Status

- ✅ Core package built and working
- ✅ SSR with React 19
- ✅ File-based routing (frontend)
- ✅ API routes with Nitro v3
- ✅ Example app demonstrating features
- 🚧 Advanced routing features
- 🚧 Server function RPC system
- 🚧 CLI tool for project scaffolding

## 📚 Learn More

Comprehensive documentation is available in the `/docs` directory covering architecture, implementation details, and usage patterns.

## 🤝 Contributing

@flow is an open exploration of full-stack React architecture. Contributions, ideas, and feedback are welcome.

## � *License

MIT

---

**Built with ❤️ for the React community**