---
name: add-credential
description: >-
  Use this skill when adding or updating an academic degree, coursework list,
  or professional certification (`src/data/education-degrees.ts`,
  `src/data/education-certs.ts`, and `public/credentials/`).
---

# Add or Update a Degree or Certification

Follow these steps to keep credential data, images, and UI mappings synchronized:

1. **Add static assets under `public/credentials/`**:
   - Place campus photos (`.webp`) or certificate badges/logos (`.png`/`.webp`) in `public/credentials/`.
2. **Update data in `src/data/`**:
   - For degrees/coursework, update `src/data/education-degrees.ts` (`Degree`, `Course`, `CourseType`: `CourseType.Core`, `CourseType.Concentration`, `CourseType.SupportCourses`). Use `https://` URLs for `schoolLink`.
   - For certifications, update `src/data/education-certs.ts` (`Cert`, `IconType.Badge` or `IconType.Logo`).
3. **Register static image imports**:
   - For a new degree school photo, import it statically in `src/components/sections/credentials/degree-card.tsx` and map the degree `title` in `schoolPhotos`.
   - For a new certification icon path, import it statically in `src/components/sections/credentials/cert-badge.tsx` and add it to `imageMap`.
4. **Verify**:
   - Ensure `<Image quality={...} />` uses `[25, 50, 75, 100]` if specified (`next.config.mjs`).
   - Run `npm run check` (`format:check`, `lint`, `typecheck`, and `test`).
