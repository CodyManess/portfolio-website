# Portfolio Data Guidelines (`src/data/`)

- **Type Contracts**: Every dataset must conform to interfaces and enums in `src/types/` (`Project`, `Tool`, `Degree`, `Course`, `CourseType`, `Cert`, `IconType`, `Role`).
- **`Tools` & `skillGroups` Dictionary**: Keep `Tools` in `src/data/tools.ts` typed with `satisfies Record<string, Tool>` so keys remain strictly typed for `noUncheckedIndexedAccess` while guaranteeing every entry matches `Tool`. `skillGroups` is defined alongside `Tools` in `src/data/tools.ts` (and re-exported by `src/data/about.ts`) so project-linked skills stay synchronized and filter `#projects` when clicked.
- **Icon Synchronization**: Whenever adding a tool to `src/data/tools.ts`, register the matching `react-icons` component under `toolIconMap` in `src/lib/tool-icons.ts`.
- **Links & Static Assets**: External links (`link`, `schoolLink`, cultural shelf URLs) must use valid `https://` URLs (rendered via `getSafeExternalUrl`). All local data here is served statically by App Router `force-static` API routes under `src/app/api/`.
