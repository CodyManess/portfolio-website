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
   - Place campus photos and certificate badges/logos (`.webp`) in `public/credentials/`.
2. **Update data and static image imports in `src/data/`**:
   - For degrees/coursework, import the campus photo (`@public/credentials/...`) in `src/data/education-degrees.ts` and add or update the `Degree` entry (`photo`, optional `date`, `Course`, `CourseType`: `CourseType.Core`, `CourseType.Concentration`, `CourseType.SupportCourses`). Use `https://` URLs for `schoolLink`.
   - For certifications, import the badge/logo (`@public/credentials/...`) in `src/data/education-certs.ts` and add or update the `Cert` entry (`icon`, `IconType.Badge` or `IconType.Logo`, plus optional `description`, `skills`, `issueDate`, `expirationDate`, `credentialId`, `credentialUrl`, and `programUrl` using `https://` URLs).
3. **Verify**:
   - Ensure `<Image quality={...} />` uses `[25, 50, 75, 100]` if specified (`next.config.mjs`).
   - Run `npm run check` (`format:check`, `lint`, `typecheck`, and `test`).
