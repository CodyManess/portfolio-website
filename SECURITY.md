# Security Policy

## Security Architecture

This portfolio site is a static-first Next.js 16 App Router application with no database or user-account persistence:

- **HTTP Security Headers** (`next.config.ts`):
  - Enforces `Content-Security-Policy` (`default-src 'self'`, `font-src 'self'`, `img-src 'self' blob: data:`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`).
  - Sets `Cross-Origin-Resource-Policy: same-origin`, `Cross-Origin-Opener-Policy: same-origin`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and `Strict-Transport-Security`, with `poweredByHeader: false`.
- **Self-Contained Assets**: Typography is bundled locally via `next/font/local` (`src/app/fonts/`), avoiding external font requests at runtime.
- **URL & Structured Data Hardening**:
  - External links pass through `getSafeExternalUrl()` (`src/lib/utils.ts`), permitting only `http:` and `https:` URLs.
  - Inline JSON-LD payloads escape `<` (`\u003c`).
- **Automated Checks**: CI runs `npm audit --omit=dev --audit-level=high` (enforced on `main` pushes and weekly scheduled runs, advisory on PRs), `npm run check` (`oxfmt --check`, `next typegen` + TypeScript 7.1 native `--noEmit`, `oxlint` with `typeAware: true` and `denyWarnings: true`, and Jest), and `npm run build` on pushes and pull requests to `main` with least-privilege `contents: read` workflow permissions, paired with weekly Dependabot updates for `npm` and `github-actions`.

## Reporting a Vulnerability

If you discover a security vulnerability, please avoid opening a public issue with exploit details. Instead, report it privately via GitHub Security Advisories for `CodyManess/portfolio-website` or via direct maintainer contact listed on the site.
