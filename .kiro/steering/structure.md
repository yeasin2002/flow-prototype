# Project Structure

## Monorepo Organization

This is a pnpm workspace monorepo managed by Turborepo with three main directories:

### `/packages` - Framework Packages

Core framework code split into focused packages:

- **@flow/core** - Main framework package (currently active)
  - Vinxi configuration
  - Build system setup
  - Runtime utilities
  - Exports: `.`, `./builds`, `./runtime`, `./config`
- **@flow/cli** - CLI tool for creating projects (placeholder)
- **@flow/create-@flow** - Project scaffolding (placeholder)
- **@flow/router** - File-based routing system (placeholder)
- **@flow/server** - Server utilities and functions (placeholder)
- **@flow/image** - Image optimization (placeholder)
- **@flow/link** - Link component (placeholder)

### `/apps` - Example Applications

- **example** - Demo app showcasing framework features (placeholder)

### `/tooling` - Shared Configuration

Reusable configs for the monorepo:

- **eslint-config** - Shared ESLint rules
  - `base.js` - Base config
  - `react-internal.js` - React-specific rules
  - `next.js` - Next.js compatibility
- **prettier-config** - Shared Prettier settings (placeholder)
- **typescript-config** - Shared TypeScript configs
  - `base.json` - Base TS config
  - `react-library.json` - For React libraries
  - `nextjs.json` - Next.js compatibility

### `/docs` - Documentation

Comprehensive three-part documentation:

- **`/docs/build-framework`** - Framework design and architecture
  - 00-Quick-Start.md - MVP in 30 minutes
  - 01-Architecture.md - System design
  - 02-Tech-Stack.md - Technology choices
  - ROADMAP.md - 12-week development plan
  - SUMMARY.md - Complete overview
  
- **`/docs/tutorial`** - Implementation tutorial (10 chapters)
  - 01-Turborepo-Setup.md - Monorepo initialization
  - 02-Package-Structure.md - Package scaffolding
  - 03-Core-Package.md - Framework core
  - 04-Vinxi-Configuration.md - Multi-router setup
  - 05-File-Based-Routing.md - Route scanner
  - 06-Server-Functions.md - Type-safe RPC
  - 07-CLI-Tool.md - Command-line interface
  - 08-Example-App.md - Complete blog app
  - 09-Deployment.md - Production deployment
  - 10-Advanced-Features.md - Middleware & optimization
  
- **`/docs/framework-example`** - End-user documentation
  - Installation and configuration guides
  - Routing and server functions
  - API reference
  - Real-world examples (blog, todo app)
  - Quick start guide

## Package Naming Convention

All framework packages use the `@flow/` scope:
- `@flow/core`
- `@flow/router`
- `@flow/server`
- etc.

## Build Outputs

- Packages build to `dist/` directory
- Apps build to `.next/` or `out/` (Next.js style)
- All build outputs are gitignored

## File Patterns

- TypeScript source in `src/` directories
- Build configs at package root (`tsconfig.json`, `tsdown.config.ts`)
- Package exports defined in `package.json` with subpath exports
- Shared configs referenced from `tooling/` packages

## Turborepo Task Dependencies

Tasks run in dependency order:
- `build` depends on `^build` (dependencies build first)
- `lint` depends on `^lint`
- `check-types` depends on `^check-types`
- `test` depends on `^build`
- `dev` runs persistently without cache
