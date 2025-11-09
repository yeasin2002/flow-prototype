# Tutorial 07: CLI Tool

Build a command-line interface for your React framework.

---

## 🎯 What We're Building

A CLI tool with commands:

- `@flow dev` - Start development server
- `@flow build` - Build for production
- `@flow start` - Start production server
- `@flow create` - Create new project

---

## 📋 Prerequisites

- ✅ Completed Tutorial 01-06
- ✅ All packages implemented
- ✅ Understanding of Node.js CLI

---

## 🚀 Step 1: CLI Package Structure

**packages/cli/src/commands/dev.ts:**

```typescript
import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import { dev } from "@@flow/core";

export function createDevCommand() {
  return new Command("dev")
    .description("Start development server")
    .option("-p, --port <port>", "Port number", "3000")
    .option("-h, --host <host>", "Host address", "localhost")
    .option("--open", "Open browser automatically")
    .action(async (options) => {
      const spinner = ora("Starting development server...").start();

      try {
        await dev({
          port: parseInt(options.port),
          host: options.host,
        });

        spinner.succeed(chalk.green("Development server started!"));
        console.log(chalk.blue(`\n  ➜  Local:   http://${options.host}:${options.port}`));
        console.log(chalk.gray(`  ➜  Press Ctrl+C to stop\n`));
      } catch (error) {
        spinner.fail(chalk.red("Failed to start development server"));
        console.error(error);
        process.exit(1);
      }
    });
}
```

---

## 🚀 Step 2: Build Command

**packages/cli/src/commands/build.ts:**

```typescript
import { Command } from "commander";
import ora from "ora";
import chalk from "chalk";
import { build } from "@@flow/core";

export function createBuildCommand() {
  return new Command("build")
    .description("Build for production")
    .option("--no-minify", "Disable minification")
    .option("--sourcemap", "Generate source maps")
    .action(async (options) => {
      const spinner = ora("Building for production...").start();

      try {
        const result = await build({
          minify: options.minify,
          sourcemap: options.sourcemap,
        });

        if (result.success) {
          spinner.succeed(chalk.green("Build completed successfully!"));
          console.log(chalk.gray("\n  Output directory: .output\n"));
        } else {
          spinner.fail(chalk.red("Build failed"));
          if (result.errors) {
            result.errors.forEach((err) => console.error(chalk.red(err.message)));
          }
          process.exit(1);
        }
      } catch (error) {
        spinner.fail(chalk.red("Build failed"));
        console.error(error);
        process.exit(1);
      }
    });
}
```

---

## 🚀 Step 3: Start Command

**packages/cli/src/commands/start.ts:**

```typescript
import { Command } from "commander";
import { spawn } from "child_process";
import chalk from "chalk";
import { resolve } from "pathe";

export function createStartCommand() {
  return new Command("start")
    .description("Start production server")
    .option("-p, --port <port>", "Port number", "3000")
    .action((options) => {
      const serverPath = resolve(process.cwd(), ".output/server/index.mjs");

      console.log(chalk.blue("Starting production server...\n"));

      const server = spawn("node", [serverPath], {
        stdio: "inherit",
        env: {
          ...process.env,
          PORT: options.port,
          NODE_ENV: "production",
        },
      });

      server.on("error", (error) => {
        console.error(chalk.red("Failed to start server:"), error);
        process.exit(1);
      });

      process.on("SIGINT", () => {
        server.kill();
        process.exit(0);
      });
    });
}
```

---

## 🚀 Step 4: Create Command

**packages/cli/src/commands/create.ts:**

```typescript
import { Command } from "commander";
import prompts from "prompts";
import ora from "ora";
import chalk from "chalk";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "pathe";

export function createCreateCommand() {
  return new Command("create")
    .description("Create a new @flow project")
    .argument("[name]", "Project name")
    .action(async (name) => {
      let projectName = name;

      if (!projectName) {
        const response = await prompts({
          type: "text",
          name: "name",
          message: "Project name:",
          initial: "my-@flow-app",
        });
        projectName = response.name;
      }

      const spinner = ora(`Creating ${projectName}...`).start();

      try {
        const projectDir = resolve(process.cwd(), projectName);

        // Create project structure
        await mkdir(projectDir, { recursive: true });
        await mkdir(resolve(projectDir, "app/routes"), { recursive: true });
        await mkdir(resolve(projectDir, "app/server"), { recursive: true });
        await mkdir(resolve(projectDir, "public"), { recursive: true });

        // Create package.json
        await writeFile(
          resolve(projectDir, "package.json"),
          JSON.stringify(
            {
              name: projectName,
              version: "0.0.1",
              type: "module",
              scripts: {
                dev: "@flow dev",
                build: "@flow build",
                start: "@flow start",
              },
              dependencies: {
                "@@flow/core": "latest",
                react: "^19.0.0",
                "react-dom": "^19.0.0",
              },
            },
            null,
            2,
          ),
        );

        // Create config file
        await writeFile(
          resolve(projectDir, "@flow.config.ts"),
          `import { defineConfig } from '@@flow/core';

export default defineConfig({
  port: 3000,
  ssr: true,
});
`,
        );

        // Create index route
        await writeFile(
          resolve(projectDir, "app/routes/index.tsx"),
          `export default function Home() {
  return (
    <div>
      <h1>Welcome to @flow!</h1>
      <p>Start building your app.</p>
    </div>
  );
}
`,
        );

        spinner.succeed(chalk.green(`Created ${projectName}!`));

        console.log(chalk.blue("\nNext steps:"));
        console.log(chalk.gray(`  cd ${projectName}`));
        console.log(chalk.gray(`  npm install`));
        console.log(chalk.gray(`  npm run dev\n`));
      } catch (error) {
        spinner.fail(chalk.red("Failed to create project"));
        console.error(error);
        process.exit(1);
      }
    });
}
```

---

## 🚀 Step 5: Main CLI Entry

**packages/cli/src/index.ts:**

```typescript
#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "fs";
import { resolve } from "pathe";
import { createDevCommand } from "./commands/dev";
import { createBuildCommand } from "./commands/build";
import { createStartCommand } from "./commands/start";
import { createCreateCommand } from "./commands/create";

const packageJson = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf-8"));

const program = new Command();

program
  .name("@flow")
  .description("@flow - A modern full-stack React framework")
  .version(packageJson.version);

// Add commands
program.addCommand(createDevCommand());
program.addCommand(createBuildCommand());
program.addCommand(createStartCommand());
program.addCommand(createCreateCommand());

// Parse arguments
program.parse();
```

---

## 🚀 Step 6: Update package.json

**packages/cli/package.json:**

```json
{
  "name": "@@flow/cli",
  "version": "0.0.1",
  "description": "CLI tool for @flow",
  "type": "module",
  "bin": {
    "@flow": "./dist/index.js"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@@flow/core": "workspace:*",
    "commander": "^12.0.0",
    "prompts": "^2.4.0",
    "chalk": "^5.3.0",
    "ora": "^8.0.0",
    "pathe": "^1.1.0"
  },
  "devDependencies": {
    "@@flow/typescript-config": "workspace:*",
    "@@flow/eslint-config": "workspace:*",
    "@types/node": "^20.12.0",
    "@types/prompts": "^2.4.0",
    "tsup": "^8.0.0",
    "typescript": "^5.4.0"
  }
}
```

---

## 🚀 Step 7: Build and Link CLI

```bash
# Build CLI
cd packages/cli
pnpm build

# Link globally for testing
pnpm link --global

# Test CLI
@flow --help
```

---

## 🚀 Step 8: Test Commands

```bash
# Create new project
@flow create my-app

# Navigate to project
cd my-app

# Install dependencies
npm install

# Start dev server
@flow dev

# Build for production
@flow build

# Start production server
@flow start
```

---

## ✅ Verification Checklist

- [ ] CLI builds successfully
- [ ] All commands work
- [ ] Help text displays correctly
- [ ] Error handling works
- [ ] Spinners and colors work

---

## 📚 What's Next?

Continue to **[08-Example-App.md](./08-Example-App.md)** to build a complete example application.

---

## 📖 Additional Resources

- [Commander.js](https://github.com/tj/commander.js)
- [Ora Spinner](https://github.com/sindresorhus/ora)
- [Chalk Colors](https://github.com/chalk/chalk)
