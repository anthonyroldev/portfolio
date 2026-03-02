# AGENTS.md

Reference for AI coding agents working in this repository.

## Project Overview

Next.js 16 portfolio site (App Router) with React 19, TypeScript 5, Tailwind CSS 4, and shadcn/ui (new-york style). Single-package project deployed to Vercel. UI language is French; code is in English.

## Build / Lint / Test Commands

```bash
# Package manager: pnpm (required — do not use npm or yarn)
pnpm install          # Install dependencies
pnpm dev              # Start dev server (next dev)
pnpm build            # Production build (next build) — also runs type checking
pnpm start            # Serve production build
pnpm lint             # ESLint via next lint
```

**No test framework is configured.** There are no jest/vitest/playwright configs, no test files, and no `test` script. If tests are added, update this section.

## Project Structure

```
app/                  # Next.js App Router — pages, layout, metadata
components/           # Reusable components
  ui/                 # shadcn/ui primitives (do not manually edit)
  Header/             # Feature component folders (PascalCase)
  Footer/
  Theme/
datas/                # Static data files and TypeScript interfaces
lib/                  # Utilities (cn helper, etc.)
public/               # Static assets (images, icons, CV)
```

### Path Alias

`@/*` maps to the project root. Always use `@/` imports instead of relative paths for cross-directory imports.

```ts
import Header from "@/components/Header/Header"
import { getProjects } from "@/datas/projects"
import { cn } from "@/lib/utils"
```

## Code Style

### TypeScript

- **Strict mode is enabled** (`strict: true` in tsconfig). All code must pass strict checks.
- Target: ES2017, module resolution: `bundler`.
- Use `type` keyword for type-only imports: `import type { Metadata } from "next"`.
- Use `z.infer<typeof schema>` for Zod-derived types.
- Prefer interfaces for data models (`export default interface Project { ... }`).
- Inline prop types for simple components; extract interfaces for complex ones.
- Layout props: `Readonly<{ children: React.ReactNode }>`.

### Components

- **Server components by default.** Only add `"use client"` when the component needs interactivity (hooks, event handlers, browser APIs).
- Page components: `export default function Page()` (named `Page`).
- Layout: `export default function RootLayout(...)`.
- Feature components: `export default function ComponentName()` — function declarations with default export.
- shadcn/ui components live in `components/ui/` and use `React.forwardRef` with named exports. **Do not manually edit** these; re-generate with the shadcn CLI.

### File & Directory Naming

| Type | Convention | Example |
|---|---|---|
| Feature component folders | PascalCase | `Header/`, `Footer/` |
| Component files | PascalCase | `Header.tsx`, `Nav.tsx` |
| Theme/utility files | kebab-case | `theme-toggle.tsx` |
| shadcn/ui components | kebab-case | `button.tsx`, `card.tsx` |
| Data/lib files | kebab-case | `projects.ts`, `utils.ts` |
| Pages & layouts | lowercase | `page.tsx`, `layout.tsx` |

### Imports

Order imports as follows (no automatic enforcer — maintain manually):

1. React / Next.js framework imports
2. Third-party library imports
3. Internal aliased imports (`@/components/...`, `@/datas/...`, `@/lib/...`)
4. Relative imports (styles, sibling modules)

### Formatting

- **Indentation:** 4 spaces for custom code. shadcn/ui files use 2 spaces (their default).
- **Quotes:** Double quotes for imports and JSX attributes.
- **Semicolons:** Not strictly enforced. Prefer consistency within a file.
- **Trailing commas:** Use in arrays and objects.
- No Prettier config — follow the existing patterns in each file.

### Styling

- **Tailwind CSS only.** No CSS modules, styled-components, or inline styles.
- Use the `cn()` utility from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional classes.
- Use `class-variance-authority` (`cva`) for component variants (shadcn/ui pattern).
- Dark mode: class-based (`darkMode: "class"`), managed by `next-themes`.
- Custom breakpoints: sm=640, md=768, lg=960, xl=1200.
- Colors use CSS variables defined in `globals.css` (shadcn/ui theme system). Custom accent: `--color-accent: #2394de`.

### Data Layer

- Static data lives in `datas/` as typed arrays with getter functions (`getProjects()`, `getSkills()`, `getLinks()`).
- Interfaces live in `datas/interfaces/`.
- Note: the directory is named `datas/` (not `data/`) — keep this convention.

### Forms & Validation

- `react-hook-form` + `@hookform/resolvers` + `zod` (v4) for form handling.
- Define Zod schemas, then derive types with `z.infer<>`.

### Error Handling

- Simple state flags (`loading`, `error`, `success`) for async operations.
- Custom `not-found.tsx` for 404 pages.
- No global error boundary currently exists.

## ESLint

Extends `next/core-web-vitals` and `next/typescript` only. No custom rules. Run `pnpm lint` to check.

## Git Conventions

- **Branch:** `main`
- **Commit style:** Lowercase conventional commits — `feat:`, `fix:`, `refactor:`, `docs:`, etc.
- **Remote:** GitHub (`anthonyroldev/portfolio`)
- No pre-commit hooks or CI/CD pipelines.

## Dependencies of Note

| Package | Purpose |
|---|---|
| `next` ^16.1 | Framework (App Router) |
| `react` ^19 | UI library |
| `tailwindcss` ^4 | Utility-first CSS |
| `framer-motion` / `motion` | Animations |
| `lucide-react`, `react-icons` | Icons |
| `@emailjs/browser` | Contact form email sending |
| `next-themes` | Dark/light mode toggle |
| `@vercel/analytics` | Analytics |
| `zod` v4 | Schema validation |

## Key Gotchas

- **No tests exist.** `pnpm build` is the primary verification step — it runs type checking.
- shadcn/ui components in `components/ui/` are generated. Modify them only via the CLI or with caution.
- The `datas/` directory spelling is intentional in this project.
- UI text content is in **French**. Variable names and code comments are in **English**.
- Tailwind v4 uses `@import "tailwindcss"` syntax and `@theme` blocks in CSS (not the v3 `@tailwind` directives).
