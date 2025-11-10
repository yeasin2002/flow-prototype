# Tech Stack

## Build System

- **Package Manager**: pnpm 9.0.0 (required)
- **Monorepo Tool**: Turborepo 2.6.0
- **Node Version**: >= 18
- **TypeScript**: 5.9.2

## Core Dependencies

- **vite** ^7.2.2 - Fast bundler and dev server
- **nitro** ^3.0.0-alpha.4 - Universal server (Vite plugin)
- **vinxi** ^0.5.8 - Multi-build orchestrator
- **react** ^19.0.0 - UI library
- **react-dom** ^19.0.0 - React DOM renderer
- **react-router-dom** ^6.30.1 - Client routing
- **h3** ^1.15.4 - HTTP framework (used by Nitro)
- **@vitejs/plugin-react** ^5.1.0 - Vite React plugin
- **pathe** ^1.1.2 - Path utilities

## Build Tools

- **@vitejs/plugin-react** - Vite React plugin
- **tsdown** - TypeScript bundler for packages
- **esbuild** - Fast TS/JSX compilation (via Vite)
- **tsx** - TypeScript execution

## Tooling

- **ESLint** - Linting (shared configs in `tooling/eslint-config`)
- **Prettier** - Code formatting
- **TypeScript** - Type checking (shared configs in `tooling/typescript-config`)

## Common Commands

### Root Level
```bash
pnpm install          # Install all dependencies
pnpm build            # Build all packages and apps
pnpm dev              # Start all dev servers
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm check-types      # Type check all packages
```

### Core Package (packages/core)
```bash
pnpm install          # Install dependencies
pnpm build            # Build with tsc + tsc-alias
pnpm dev              # Watch mode build
pnpm lint             # Lint package
pnpm type-check       # Type check without emit
pnpm clean            # Remove dist folder
```

### Example App (packages/core/example)
```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (tsx dev.ts)
pnpm build            # Build for production (tsx build.ts)
```

## Package Exports Pattern

Packages use subpath exports for better tree-shaking:
```json
{
  ".": "./dist/index.js",
  "./builds": "./dist/builds/index.js",
  "./runtime": "./dist/runtime/index.js",
  "./config": "./dist/types/config.js"
}
```

## TypeScript Configuration

- Base configs in `tooling/typescript-config`
- Variants: `base.json`, `nextjs.json`, `react-library.json`
- All packages extend shared configs for consistency
