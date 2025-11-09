# Tech Stack

## Build System

- **Package Manager**: pnpm 9.0.0 (required)
- **Monorepo Tool**: Turborepo 2.6.0
- **Node Version**: >= 18
- **TypeScript**: 5.9.2

## Core Dependencies

- **vinxi** ^0.5.x - Multi-build orchestrator
- **nitro** ^2.9.x - Universal server framework
- **vite** ^5.x - Fast bundler
- **react** ^19.x - UI library
- **react-dom** ^19.x - React DOM renderer
- **react-router-dom** ^6.x - Client routing
- **h3** ^1.x - HTTP framework (Nitro's foundation)

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

### Package Level
```bash
pnpm build            # Build package with tsdown
pnpm dev              # Watch mode build
pnpm lint             # Lint package
pnpm type-check       # Type check without emit
pnpm clean            # Remove dist folder
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
