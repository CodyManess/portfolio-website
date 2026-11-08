# Portfolio Website - Agent Instructions & Workspace Rules

Welcome! This workspace contains Cody Maness's personal portfolio website, built with Next.js 16 (App Router), React 19, TypeScript 6, Tailwind CSS v4, and shadcn/ui (`base-nova` style using `@base-ui/react` primitives).

Please adhere to the following architecture, framework conventions, naming rules, styling guidelines, documentation sync rules, and testing protocols.

---

## Directory Architecture & Aliases

We utilize a standard `src/` directory layout:

```text
├── __tests__/           # Centralized unit test suite (Jest & React Testing Library)
├── public/              # Static assets (campus photos, badges, company logos, etc.)
└── src/
    ├── app/             # Next.js App Router pages, static API routes, metadata & styles
    ├── components/      # Modular React UI components
    │   ├── about/       # About Me bento grid section
    │   ├── credentials/ # Education cards, degree coursework modal, and cert badges
    │   ├── experience/  # Work experience section
    │   ├── intro/       # Hero section and intro card
    │   ├── nav/         # Navigation components (AppBar, BottomNav, Footer)
    │   ├── projects/    # Project list, technology filter, cards, and detail modal
    │   ├── shared/      # Shared UI components (Accordion, ContactMe, Pagination, ToolChip, WorkTimeline)
    │   └── ui/          # shadcn/ui & Base UI primitive components (Badge, Button, Card, Dialog, Skeleton)
    ├── data/            # Structured local data (about, degrees, certs, experience, links, projects, tools)
    ├── lib/             # Shared utilities (`utils.ts` for `cn`/`CARD_CLASSNAME`, `tool-icons.ts` for `toolIconMap`)
    └── types/           # Core TypeScript interfaces and enums
```

### Import Aliases

- Use `@/*` to map directly to `./src/*` (e.g., `import { cn } from '@/lib/utils'`).
- Use `@public/*` to map to `./public/*` (e.g., `import profilePic from '@public/intro/portfolio-picture.webp'`).
- **NEVER** use `@/shared/*` or relative paths reaching outside the `src/` directory where aliases are cleaner.

---

## Framework & Architecture Conventions

- **Base UI (`@base-ui/react`), NOT Radix UI**: UI primitives in `src/components/ui/` use shadcn's `"base-nova"` style on top of `@base-ui/react`. Use Base UI's `render` prop for element composition rather than Radix's `asChild`, and do not install `@radix-ui/*` packages.
- **Tailwind CSS v4 (CSS-first config)**: Tailwind v4 is configured directly in `src/app/globals.css` via `@import "tailwindcss";`, `@theme inline`, and `@custom-variant dark (@media (prefers-color-scheme: dark));`. There is **no** `tailwind.config.js` or `tailwind.config.ts`.
- **Next.js 16 Image Qualities**: `next.config.mjs` restricts `next/image` `qualities` to `[25, 50, 75, 100]`. Any `<Image quality={...} />` prop must use one of those configured values.
- **Static Data & API Routes**: Structured portfolio content lives in `src/data/` typed against interfaces in `src/types/`. Route handlers under `src/app/api/` use `export const dynamic = 'force-static'` so they prerender statically at build time.

---

## Naming & Formatting Conventions

- **Directories & Files**: All file and directory names must use **kebab-case** (lowercase separated by hyphens).
  - _Correct_: `src/components/credentials/school-card.tsx`
  - _Incorrect_: `src/components/Credentials/schoolCard.tsx`
- **React Components**: Use PascalCase for React component names internally, while keeping the file name in kebab-case.
- **Prettier Formatting**: Configured in `package.json` (`semi: false`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: "es5"`). Run `npm run format` to format files across the repository.

---

## Styling, Shared Helpers & Icons

- **Tailwind & Custom Colors**: Use custom styling tokens defined in `src/app/globals.css` to maintain brand consistency:
  - `--primary-color` (`#007ab8`) - Main brand blue.
  - `--primary-dark` (`#196db2`) - Darker blue hover states.
  - `--primary-light` (`#5fb5f6`) - Light accent blue.
  - `--background`, `--foreground`, etc., are mapped to shadcn variables and adapt automatically via `@media (prefers-color-scheme: dark)`.
- **Shared Card Styling & Micro-animations**: Use `CARD_CLASSNAME` from `@/lib/utils` for interactive cards to keep borders, gradients, shadows, and smooth hover animations (`transition-all duration-300 ease-out hover:-translate-y-1.5`) consistent.
- **Icons**:
  - **Technology & Brand Logos**: Utilize `react-icons` (`react-icons/si` or `react-icons/fa6`) and register new tool icons centrally in `toolIconMap` (`@/lib/tool-icons`) whenever adding a tool to `src/data/tools.ts`.
  - **General UI Icons**: Utilize `lucide-react` for UI controls (close buttons, chevrons, external links, etc.).

---

## Documentation Synchronization

- **Recheck Docs After Changes**: Before finishing a task that adds, removes, or renames directories under `src/`, modifies path aliases in `tsconfig.json`, updates scripts in `package.json`, or changes core features/architecture, recheck and update **both** `README.md` and `.agents/AGENTS.md` so they remain in sync.
- **Root `AGENTS.md` & `CLAUDE.md`**: The `<!-- BEGIN:nextjs-agent-rules -->` block in root `AGENTS.md` is maintained automatically by `next dev`. Do not remove that block; place all custom workspace instructions in `.agents/AGENTS.md`. `CLAUDE.md` references both `@AGENTS.md` and `@.agents/AGENTS.md`.

---

## Testing & Validation

- All unit tests must be stored in the root `__tests__/` directory.
- Before completing any task, verify that documentation (`README.md`, `.agents/AGENTS.md`) is still accurate and run validation commands to ensure formatting, linting, tests, and the production build pass:
  - Run linting: `npm run lint`
  - Run tests: `npm test` (or `npm run test`)
  - Run production build: `npm run build`
  - Run formatter (when needed): `npm run format`
