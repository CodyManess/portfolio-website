---
name: add-project
description: >-
  Use this skill when adding or updating a portfolio project or technology tool
  badge in the Projects section (`src/data/projects.ts`, `src/data/tools.ts`,
  and `src/lib/tool-icons.ts`).
---

# Add or Update a Portfolio Project

Follow these steps to add a project or new technology chip safely and consistently:

1. **Register the tool icon in `src/lib/tool-icons.ts`**:
   - Import the brand icon from `react-icons/si` or `react-icons/fa6` and add it to `toolIconMap` (`Tool.iconName` is typed as `ToolIconName = keyof typeof toolIconMap`, so TypeScript enforces a valid key).
2. **Check or add tools in `src/data/tools.ts`**:
   - Reuse an existing `Tools.<Key>` entry when possible.
   - If adding a new tool, add it to the `Tools` object (keeping `} satisfies Record<string, Tool>`) with `title`, `iconName` (matching `ToolIconName`), and `iconColor`.
3. **Add optional project photos under `public/projects/`**:
   - Place project screenshots/photos (`.webp`) in `public/projects/` and import them via `@public/projects/...` in `src/data/projects.ts`.
   - Use `<Image quality={75} />` or `[25, 50, 75, 100]` values (`next.config.ts`).
4. **Add the project in `src/data/projects.ts`**:
   - Match the `Project` interface (`title`, `description`, optional `link`, optional `photos` array of `{ src, alt, caption? }`, `achievements`, `tools`).
   - Only use `https://` URLs for `link` (components validate URLs through `getSafeExternalUrl`).
5. **Update tests if needed and validate**:
   - Check `__tests__/project-list.test.tsx`, `__tests__/project-card.test.tsx`, and `__tests__/project-modal.test.tsx` if expectations depend on project counts or fields.
   - Run `npm run check` (`format:check`, `lint`, `typecheck`, and `test`).
