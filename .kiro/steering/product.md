# Product Overview

ReactFlow is a full-stack React meta-framework built to understand modern SSR and hybrid rendering architecture. It's a learning project inspired by Next.js, TanStack Start, and Nuxt.

## Core Features

- Server-Side Rendering (SSR) with React 19
- Hybrid rendering (client/server components)
- File-based routing for both frontend and API
- Type-safe server functions (RPC)
- Streaming and progressive HTML delivery
- Image optimization
- Edge-ready deployment (Vercel, Cloudflare, etc.)
- TypeScript-first with full type safety
- CLI tool for project scaffolding

## Architecture

Built on three pillars:
- **Vinxi**: Multi-build orchestrator for unified dev experience
- **Vite**: Fast bundler with HMR and optimized builds
- **Nitro**: Universal server framework with multiple deployment targets

## Documentation Structure

The project has comprehensive documentation in `/docs`:

- **`/docs/build-framework`** - Framework architecture and design decisions
  - Quick start, architecture, tech stack, roadmap
  - Phase-by-phase implementation guides
  
- **`/docs/tutorial`** - Step-by-step implementation tutorial
  - 10 chapters from Turborepo setup to advanced features
  - Covers monorepo, routing, server functions, CLI, deployment
  
- **`/docs/framework-example`** - End-user usage documentation
  - Installation, configuration, routing, server functions
  - Real-world examples (blog, todo app)
  - API reference and best practices

## Project Status

This is a learning/prototype project, not production-ready. The goal is to deeply understand framework internals, modern React patterns, and full-stack architecture.

## Design Principles

1. Developer experience first
2. Performance by default
3. Type safety throughout
4. Universal deployment
5. Minimal magic - explicit over implicit
6. Progressive enhancement
