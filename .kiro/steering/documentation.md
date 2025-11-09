# Documentation Guidelines

## Documentation Structure

All documentation lives in `/docs` with three distinct sections:

### 1. Framework Design (`/docs/build-framework`)

Architecture and design documentation for framework developers:
- System architecture and design decisions
- Technology stack rationale
- Development roadmap and phases
- Quick start for building the framework

### 2. Implementation Tutorial (`/docs/tutorial`)

Step-by-step guide for building the framework from scratch:
- 10 progressive chapters
- Covers monorepo setup through advanced features
- Includes code examples and explanations
- Teaches framework internals

### 3. Usage Documentation (`/docs/framework-example`)

End-user documentation for developers using @flow:
- Installation and configuration
- Feature guides (routing, server functions, etc.)
- API reference
- Real-world examples
- Best practices

## When Working on Documentation

- **Architecture changes** → Update `/docs/build-framework`
- **Implementation tutorials** → Update `/docs/tutorial`
- **User-facing features** → Update `/docs/framework-example`
- **API changes** → Update `api-reference.md`

## Documentation Style

- Use clear, concise language
- Include code examples for all features
- Provide both simple and advanced examples
- Link between related documentation sections
- Keep examples up-to-date with implementation

## Cross-References

When referencing documentation:
- Framework design: `docs/build-framework/`
- Tutorial: `docs/tutorial/`
- Usage guide: `docs/framework-example/`
