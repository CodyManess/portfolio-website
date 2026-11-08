<!-- ABOUT THE PROJECT -->

# Cody Maness — Personal Portfolio

This repository contains the source code for my personal portfolio website, built with [Next.js](https://nextjs.org) (App Router), [React](https://react.dev), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/) ([Base UI](https://base-ui.com/) primitives).

Visit the live site at **[codymaness.com](https://codymaness.com)**.

---

## Built With

[![Next.js][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Tailwind CSS][TailwindCSS]][Tailwind-url]
[![shadcn/ui][ShadcnUI]][Shadcn-url]
[![Jest][Jest]][Jest-url]

### Deployed With

[![Firebase][Firebase]][Firebase-url]
[![Google Cloud][Google Cloud]][GCP-url]

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=3178C6
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-0F172A?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8
[Tailwind-url]: https://tailwindcss.com/
[ShadcnUI]: https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white
[Shadcn-url]: https://ui.shadcn.com/
[Jest]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Firebase]: https://img.shields.io/badge/firebase-20232A?style=for-the-badge&logo=firebase&logoColor=DD2C00
[Firebase-url]: https://firebase.google.com/
[Google Cloud]: https://img.shields.io/badge/google_cloud-20232A?style=for-the-badge&logo=googlecloud&logoColor=4285F4
[GCP-url]: https://cloud.google.com/

---

## Features & Highlights

- **Hero & SEO Metadata**: Responsive intro card with preloaded profile imagery, JSON-LD `Person` structured data, statically generated OpenGraph & app icons (`next/og`), `sitemap.xml`, `robots.txt`, and HTTP security headers.
- **About Me (Bento Grid)**: Showcases background story, core mission statement, technical & personal interests, and external cultural shelf links (Letterboxd, Goodreads, Backloggd, YouTube Music).
- **Work Experience & Extended Timeline**: Interactive timeline on the home page (`/#experience`) and dedicated extended work history route (`/extended`) powered by accessible, CSS-grid animated accordions.
- **Education & Certifications**: Degree cards with keyboard-accessible coursework modals (category tabs for Core Requirements, Concentration, and Supporting Courses, plus academic honors and program links) alongside certification badges.
- **Filterable & Paginated Projects**: Project showcase with technology filter chips (including per-tool project counts), client-side pagination, keyboard-accessible cards, and detail modals highlighting tech stacks and key contributions.
- **Responsive Navigation & Theme Support**: Auto-hiding desktop app bar, mobile bottom navigation bar with safe-area support, and automatic light/dark mode theming via CSS custom properties.

---

## Getting Started

### Prerequisites

- **Node.js** `>=20.9.0`
- **npm** (or a compatible package manager)

### Installation & Local Development

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/CodyManess/portfolio-website.git
   cd portfolio-website
   npm install
   ```

2. Start the Next.js development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `npm run dev`    | Starts the local Next.js development server.          |
| `npm run build`  | Creates an optimized production build (`next build`). |
| `npm start`      | Starts the production server (`next start`).          |
| `npm run lint`   | Runs ESLint across the project (`eslint .`).          |
| `npm test`       | Runs the Jest unit test suite in `__tests__/`.        |
| `npm run format` | Formats files across the repository with Prettier.    |

---

## Project Architecture

All source code and test files follow standard Next.js App Router conventions with **kebab-case** file and directory naming:

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
    ├── lib/             # Shared utilities (`cn`, card styles, and technology icon mappings)
    └── types/           # Core TypeScript interfaces and enums
```

### Import Aliases

- `@/*` maps to `./src/*` (e.g., `import { cn } from '@/lib/utils'`)
- `@public/*` maps to `./public/*` (e.g., `import profilePic from '@public/intro/portfolio-picture.webp'`)

---

## Roadmap

- [x] Add an About Me Section
- [x] Move Const Data into a proper API
- [x] Add Technology Filtering & Pagination to Projects
- [x] Migrate UI to Tailwind CSS v4 & shadcn/ui (Base UI)
- [x] Next.js 16 Static Prerendering & Image Optimizations
- [x] Improve Keyboard & Screen Reader Accessibility
- [ ] Further Visual & Micro-Interaction Enhancements

---

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) & [Base UI](https://base-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/) & [Lucide](https://lucide.dev/)
- [Img Shields](https://shields.io)
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
