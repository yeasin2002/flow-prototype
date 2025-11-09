# @flow - Full-Stack React Meta-Framework

A modern full-stack React framework built with Vite, Nitro, and Vinxi - inspired by Next.js, TanStack Start, and Nuxt.

---

## 🎯 Project Goal

Build a production-ready full-stack React meta-framework with:

- ✅ **Server-Side Rendering (SSR)** - React 19 with streaming
- ✅ **Hybrid Rendering** - Client and Server Components
- ✅ **File-Based Routing** - Automatic route generation for frontend and API
- ✅ **Server Functions** - Type-safe RPC calls
- ✅ **Streaming** - Progressive HTML delivery
- ✅ **Image Optimization** - Automatic image processing
- ✅ **Edge Ready** - Deploy anywhere (Vercel, Cloudflare, etc.)
- ✅ **TypeScript First** - Full type safety
- ✅ **CLI Tool** - Project scaffolding and development commands

---

## 📚 Documentation

This project has comprehensive documentation organized into three sections:

### 🏗️ [Framework Design](./docs/build-framework/)

Architecture and design documentation for understanding the framework:

- **[Quick Start](./docs/build-framework/00-Quick-Start.md)** - Build MVP in 30 minutes
- **[Architecture](./docs/build-framework/01-Architecture.md)** - System design and decisions
- **[Tech Stack](./docs/build-framework/02-Tech-Stack.md)** - Technology choices and rationale
- **[Roadmap](./docs/build-framework/ROADMAP.md)** - 12-week development plan
- **[Summary](./docs/build-framework/SUMMARY.md)** - Complete overview

### 📖 [Implementation Tutorial](./docs/tutorial/)

Step-by-step guide to building the framework from scratch (10 chapters):

1. **[Turborepo Setup](./docs/tutorial/01-Turborepo-Setup.md)** - Monorepo initialization
2. **[Package Structure](./docs/tutorial/02-Package-Structure.md)** - Package scaffolding
3. **[Core Package](./docs/tutorial/03-Core-Package.md)** - Framework core implementation
4. **[Vinxi Configuration](./docs/tutorial/04-Vinxi-Configuration.md)** - Multi-router architecture
5. **[File-Based Routing](./docs/tutorial/05-File-Based-Routing.md)** - Route scanner and generation
6. **[Server Functions](./docs/tutorial/06-Server-Functions.md)** - Type-safe RPC system
7. **[CLI Tool](./docs/tutorial/07-CLI-Tool.md)** - Command-line interface
8. **[Example App](./docs/tutorial/08-Example-App.md)** - Complete blog application
9. **[Deployment](./docs/tutorial/09-Deployment.md)** - Production deployment strategies
10. **[Advanced Features](./docs/tutorial/10-Advanced-Features.md)** - Middleware and optimization

### 🚀 [Usage Guide](./docs/framework-example/)

End-user documentation for developers using @flow:

- **[Installation](./docs/framework-example/01-installation.md)** - Setup and installation
- **[Configuration](./docs/framework-example/02-configuration.md)** - Framework configuration
- **[Routing](./docs/framework-example/04-routing.md)** - File-based routing system
- **[Server Functions](./docs/framework-example/05-server-functions.md)** - Type-safe backend calls
- **[API Reference](./docs/framework-example/api-reference.md)** - Complete API documentation
- **[Quick Start Guide](./docs/framework-example/quick-start-guide.md)** - Get started quickly
- **[Examples](./docs/framework-example/examples/)** - Real-world examples (blog, todo app)

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 20.x
npm >= 10.x
```

### Framework Name

Let's call it **"@flow"** (you can change this later)

### Development Approach

We'll build this framework in **3 stages**:

**Stage 1: MVP (Minimum Viable Product)**

- Basic SSR
- File-based routing
- Server functions
- Simple deployment

**Stage 2: Enhanced**

- Client/Server components
- Streaming
- Image optimization
- Advanced routing

**Stage 3: Production-Ready**

- CLI tool
- Plugin system
- Full documentation
- Example apps

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     @flow Framework                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Vinxi      │  │    Vite      │  │    Nitro     │     │
│  │ (Orchestrator)│  │ (Bundler)    │  │  (Server)    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│         ┌──────────────────┴──────────────────┐             │
│         │                                     │             │
│    ┌────▼────┐                          ┌────▼────┐        │
│    │ Client  │                          │ Server  │        │
│    │  Build  │                          │  Build  │        │
│    └────┬────┘                          └────┬────┘        │
│         │                                     │             │
│    ┌────▼────────────┐              ┌────────▼─────┐       │
│    │ Browser Bundle  │              │ SSR Handler  │       │
│    │ - React         │              │ - React SSR  │       │
│    │ - Hydration     │              │ - Routing    │       │
│    │ - Client Code   │              │ - API Routes │       │
│    └─────────────────┘              └──────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Core Technologies

### Build System

- **Vinxi** - Multi-build orchestrator (like Turbopack for Next.js)
- **Vite** - Fast bundler with HMR
- **esbuild** - Fast TypeScript/JSX compilation

### Server

- **Nitro** - Universal server framework
- **H3** - HTTP framework (used by Nitro)
- **unjs** ecosystem - Universal JavaScript tools

### React

- **React 19** - Latest React with Server Components support
- **React Router** - Client-side routing
- **React Server Components** - Server-side components (future)

### Routing

- **unplugin-vue-router** concepts - File-based routing patterns
- Custom route generator - Parse file system to routes

### Optimization

- **sharp** - Image optimization
- **@vercel/og** - Open Graph image generation
- **lightningcss** - Fast CSS processing

---

## 📦 Key Packages

### Core Dependencies

```json
{
  "vinxi": "^0.4.x",
  "nitro": "^2.9.x",
  "vite": "^5.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-router-dom": "^6.x",
  "h3": "^1.x"
}
```

### Build Tools

```json
{
  "@vitejs/plugin-react": "^4.x",
  "unplugin-auto-import": "^0.17.x",
  "vite-plugin-inspect": "^0.8.x"
}
```

### Optimization

```json
{
  "sharp": "^0.33.x",
  "lightningcss": "^1.x",
  "@vercel/og": "^0.6.x"
}
```

---

## 🎓 Learning Path

### Week 1: Foundation

- [ ] Read all Phase 1 docs
- [ ] Set up basic Vinxi project
- [ ] Understand Nitro basics
- [ ] Create simple SSR example

### Week 2: Core Features

- [ ] Implement file-based routing
- [ ] Build SSR system
- [ ] Add server functions
- [ ] Test basic deployment

### Week 3: Advanced Features

- [ ] Client/Server component split
- [ ] Streaming implementation
- [ ] Image optimization
- [ ] Advanced routing patterns

### Week 4: Polish

- [ ] Build CLI tool
- [ ] Write documentation
- [ ] Create example apps
- [ ] Performance optimization

---

## 🎯 Success Criteria

Your framework is ready when:

- ✅ Can render React on server
- ✅ Hydrates correctly on client
- ✅ File-based routing works
- ✅ Server functions are type-safe
- ✅ Can deploy to multiple platforms
- ✅ Has good DX (Developer Experience)
- ✅ Performance is comparable to Next.js

---

## 🤝 Comparison with Existing Frameworks

| Feature                 | @flow | Next.js      | TanStack Start | Nuxt |
| ----------------------- | --------- | ------------ | -------------- | ---- |
| SSR                     | ✅        | ✅           | ✅             | ✅   |
| File Routing            | ✅        | ✅           | ✅             | ✅   |
| Server Functions        | ✅        | ✅ (Actions) | ✅             | ✅   |
| Streaming               | ✅        | ✅           | ✅             | ✅   |
| Edge Ready              | ✅        | ✅           | ✅             | ✅   |
| Image Optimization      | ✅        | ✅           | ❌             | ✅   |
| React Server Components | 🚧        | ✅           | 🚧             | N/A  |
| Framework               | React     | React        | React          | Vue  |

---

## 📖 Next Steps

1. **Start with Architecture** - Read [01-Architecture.md](./01-Architecture.md)
2. **Understand the Stack** - Read [02-Tech-Stack.md](./02-Tech-Stack.md)
3. **Set Up Project** - Follow [03-Project-Setup.md](./03-Project-Setup.md)
4. **Build Core Features** - Work through Phase 2 docs
5. **Add Advanced Features** - Implement Phase 3 features
6. **Polish and Deploy** - Complete Phase 4 & 5

---

## 💡 Philosophy

### Design Principles

1. **Developer Experience First** - Make it easy and enjoyable to use
2. **Performance by Default** - Optimize without configuration
3. **Type Safety** - Full TypeScript support
4. **Universal** - Deploy anywhere
5. **Minimal Magic** - Explicit over implicit
6. **Progressive Enhancement** - Works without JavaScript

### Inspired By

- **Next.js** - Developer experience and conventions
- **TanStack Start** - Type safety and modern patterns
- **Nuxt** - Universal rendering and Nitro integration
- **Remix** - Web standards and data loading

---

## 🚨 Important Notes

### What This Is NOT

- ❌ A fork of Next.js or TanStack Start
- ❌ A production-ready framework (yet)
- ❌ A replacement for existing frameworks
- ✅ A learning project to understand framework internals
- ✅ A foundation for your own framework
- ✅ A way to deeply understand SSR and modern React

### Realistic Expectations

Building a framework is **hard**. Expect:

- 📅 **Time**: 1-3 months for MVP
- 🐛 **Bugs**: Many edge cases to handle
- 📚 **Learning**: Deep dive into React internals
- 🔧 **Maintenance**: Ongoing work required

---

## 🎉 Let's Build!

Ready to start? Head to **[01-Architecture.md](./01-Architecture.md)** to begin your journey!

---

## 📞 Resources

- [Vinxi Documentation](https://vinxi.vercel.app/)
- [Nitro Documentation](https://nitro.unjs.io/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TanStack Start Source](https://github.com/TanStack/router)
- [Next.js Source](https://github.com/vercel/next.js)
- [Nuxt Source](https://github.com/nuxt/nuxt)

---

**Good luck building your framework! 🚀**