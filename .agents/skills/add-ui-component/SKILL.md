---
name: add-ui-component
description: >-
  Use this skill when adding or updating shadcn/ui primitives under
  `src/components/ui/` or building interactive UI components with Base UI and
  Tailwind CSS v4.
---

# Add or Update a UI Component

This repository uses shadcn/ui (`base-nova` style) powered by `@base-ui/react` primitives and Tailwind CSS v4.

1. **Scaffold via shadcn CLI when adding primitives**:
   - Run `npx shadcn@latest add <component>` (uses `components.json` with `style: "base-nova"`, `rsc: true`, and `iconLibrary: "lucide"`).
   - Never install `@radix-ui/*` packages or use Radix's `asChild` prop; use Base UI's `render` prop for element composition.
2. **Follow naming and styling conventions**:
   - Use kebab-case filenames under `src/components/` and PascalCase component symbols.
   - Reuse `cn` from `@/lib/utils`, `<Card variant="interactive">` / `interactiveCardVariants` from `@/components/ui/card`, and theme tokens in `src/app/globals.css` (`--primary-color`, `--primary-dark`, `--primary-light`, `--surface-background`).
   - Honor `prefers-reduced-motion` (`motion-reduce:`) and preserve keyboard focus and accessible names (`eslint-plugin-jsx-a11y` recommended rules are enforced as errors).
3. **Add unit tests and verify**:
   - Add a matching kebab-case test file under `__tests__/` following `__tests__/AGENTS.md`.
   - Run `npm run check`.
