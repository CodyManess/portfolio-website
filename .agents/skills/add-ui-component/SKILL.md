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
   - Reuse `cn` from `@/lib/utils`, `<Card variant="interactive">` / `interactiveCardVariants` from `@/components/ui/card`, shared layout helpers (`PageSection`, `SectionHeading`, `Overline`, `BackLink`, `ExternalActionLink`, `SectionErrorAlert`, `StatusPageCard`), semantic Tailwind v4 theme tokens (`brand`, `brand-strong`, `brand-dark`, `brand-light`, `section`, `surface`, `toolbar`, `footer`, `text-2xs`, `shadow-surface`, `shadow-card-hover`, `shadow-brand-sm`, `shadow-brand-glow`) from `src/app/globals.css`, and the standardized z-index scale (`z-30` nav, `z-40` overlay, `z-50` dialog, `z-60` skip link).
   - Honor `prefers-reduced-motion` (`motion-reduce:`) and preserve keyboard focus and accessible names (`jsx-a11y` rules are enforced as errors in `.oxlintrc.json`).
3. **Add unit tests and verify**:
   - Add a matching kebab-case test file under `__tests__/` following `__tests__/AGENTS.md`.
   - Run `npm run check`.
