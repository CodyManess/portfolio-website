# Portfolio Website - Agent Instructions & Workspace Rules

Welcome! This workspace contains Cody Maness's personal portfolio website, built with Next.js (App Router), TypeScript, Tailwind CSS, and Shadcn UI (using base-ui primitives).

Please adhere to the following directory layout, naming rules, style guidelines, and testing protocols.

---

## Directory Architecture & Aliases

We utilize a standard `src/` directory layout.

```
├── __tests__/           # Centralized test directory (Jest)
├── public/              # Static assets (images, logos, badges, etc.)
└── src/
    ├── app/             # Next.js App Router routes, API paths, and global styles
    ├── components/      # UI components
    │   ├── nav/         # Navigation components (AppBar, BottomNav, Footer)
    │   ├── shared/      # Shared general UI components (Accordion, ContactMe)
    │   └── ui/          # Shadcn / Base UI primitive custom components
    ├── data/            # Static local data (experience details, projects, degrees)
    ├── lib/             # Utility functions
    └── types/           # Core TypeScript type definitions
```

### Import Aliases
- Use `@/*` to map directly to `./src/*` (e.g., `import { cn } from '@/lib/utils'`).
- Use `@public/*` to map to `./public/*` (e.g., `import logo from '@public/logo.png'`).
- **NEVER** use `@/shared/*` or relative paths reaching outside the `src/` directory where aliases are cleaner.

---

## Naming Conventions

- **Directories & Files**: All file and directory names must use **kebab-case** (lowercase separated by hyphens).
  - *Correct*: `src/components/credentials/school-card.tsx`
  - *Incorrect*: `src/components/Credentials/schoolCard.tsx`
- **React Components**: Use PascalCase for React component names internally, but the file name must remain kebab-case.

---

## Styling & Design System

- **Tailwind & Custom Colors**: We use custom styling tokens defined in `src/app/globals.css`. Use them to maintain brand consistency:
  - `--primary-color` (`#007ab8`) - Main brand blue.
  - `--primary-dark` (`#196db2`) - Darker blue hover states.
  - `--primary-light` (`#5fb5f6`) - Light accent blue.
  - `--background`, `--foreground`, etc., are mapped to shadcn variables.
- **Micro-animations**: Keep hover animations smooth (e.g. `transition-all duration-300 hover:-translate-y-1`).
- **Icons**: Utilize `react-icons` (such as `si` for simple-icons or `fa` for FontAwesome).

---

## Testing & Validation

- All unit tests must be stored in the root `__tests__/` directory.
- Before completing any task, run validation commands to ensure the build and tests pass:
  - Run linting: `npm run lint`
  - Run tests: `npm run test` or `npm test`
  - Run production build: `npm run build`
