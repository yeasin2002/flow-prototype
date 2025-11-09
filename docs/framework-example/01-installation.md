# Installation

Get started with @flow in minutes.

---

## Prerequisites

Before installing @flow, ensure you have:

- **Node.js** 20.0.0 or higher
- **pnpm** 8.0.0 or higher (recommended) or npm/yarn

Check your versions:

```bash
node --version  # Should be >= 20.0.0
pnpm --version  # Should be >= 8.0.0
```

---

## Create New Project

### Using create-@flow (Recommended)

```bash
# With pnpm
pnpm create @flow my-app

# With npm
npx create-@flow my-app

# With yarn
yarn create @flow my-app
```

This will:

1. Create a new directory `my-app`
2. Set up the project structure
3. Install dependencies
4. Configure TypeScript

### Interactive Setup

```bash
pnpm create @flow
```

You'll be prompted for:

- Project name
- Template (basic, blog, e-commerce)
- Package manager (pnpm, npm, yarn)
- TypeScript (yes/no)

---

## Manual Installation

If you prefer to set up manually:

### 1. Create Directory

```bash
mkdir my-app
cd my-app
```

### 2. Initialize Package

```bash
pnpm init
```

### 3. Install @flow

```bash
pnpm add @@flow/core react react-dom
pnpm add -D @@flow/cli typescript @types/react @types/react-dom
```

### 4. Create Configuration

**@flow.config.ts:**

```typescript
import { defineConfig } from "@@flow/core";

export default defineConfig({
  port: 3000,
  ssr: true,
});
```

### 5. Create Directory Structure

```bash
mkdir -p app/routes app/server public
```

### 6. Create Entry Points

**app/entry-client.tsx:**

```typescript
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

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
import { App } from './App';

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}
```

### 7. Add Scripts

**package.json:**

```json
{
  "scripts": {
    "dev": "@flow dev",
    "build": "@flow build",
    "start": "@flow start"
  }
}
```

---

## Project Templates

### Basic Template

```bash
pnpm create @flow my-app --template basic
```

Includes:

- Basic routing
- Example pages
- TypeScript setup

### Blog Template

```bash
pnpm create @flow my-blog --template blog
```

Includes:

- Blog post routes
- Markdown support
- RSS feed
- SEO optimization

### E-commerce Template

```bash
pnpm create @flow my-store --template ecommerce
```

Includes:

- Product catalog
- Shopping cart
- Checkout flow
- Payment integration

### Full-stack Template

```bash
pnpm create @flow my-app --template fullstack
```

Includes:

- Authentication
- Database integration
- API routes
- Admin dashboard

---

## Verify Installation

```bash
# Navigate to project
cd my-app

# Start dev server
pnpm dev
```

Open `http://localhost:3000` in your browser. You should see the welcome page.

---

## IDE Setup

### VS Code

Install recommended extensions:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

**settings.json:**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### WebStorm

1. Enable ESLint: `Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
2. Enable Prettier: `Settings > Languages & Frameworks > JavaScript > Prettier`
3. Set TypeScript version: `Settings > Languages & Frameworks > TypeScript`

---

## Troubleshooting

### Port Already in Use

```bash
# Use different port
pnpm dev --port 4000
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .@flow
pnpm install
```

### TypeScript Errors

```bash
# Regenerate types
pnpm type-check
```

### Build Fails

```bash
# Clean build cache
rm -rf .output .vinxi .nitro
pnpm build
```

---

## Next Steps

- [Configuration](./02-configuration.md) - Configure your project
- [Project Structure](./03-project-structure.md) - Understand the structure
- [Routing](./04-routing.md) - Create your first route

---

## Upgrading

### Check Current Version

```bash
pnpm list @@flow/core
```

### Upgrade to Latest

```bash
pnpm update @@flow/core @@flow/cli
```

### Upgrade to Specific Version

```bash
pnpm add @@flow/core@1.2.3
```

---

## Uninstalling

```bash
# Remove dependencies
pnpm remove @@flow/core @@flow/cli

# Delete project
cd ..
rm -rf my-app
```
