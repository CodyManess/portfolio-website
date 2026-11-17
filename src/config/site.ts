import { socialLinks } from '@/data/links'

export const siteConfig = {
  url: 'https://codymaness.com',
  name: 'Cody Maness',
  role: 'Full-Stack Developer',
  location: 'Raleigh, NC',
  title: 'Cody Maness | Full-Stack Developer',
  description:
    'Full-Stack Developer with 5+ years of experience building accessible, scalable web and mobile applications.',
  shortDescription:
    'Full-Stack Developer with 5+ years of experience building engaging, accessible web and mobile applications.',
  ogImagePath: '/opengraph-image',
  extendedTitle: 'Cody Maness | Extended Work History',
  extendedDescription:
    'An extra page within my portfolio detailing past jobs worked before and during college.',
  lastModified: '2026-11-17',
  sameAs: [socialLinks.GitHub, socialLinks.LinkedIn],
  employer: 'The Cigna Group',
  alumniOf: [
    {
      name: 'Middle Tennessee State University',
      url: 'https://www.mtsu.edu/',
    },
    {
      name: 'Louisiana State University Shreveport',
      url: 'https://www.lsus.edu/',
    },
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Tailwind CSS',
    'Kotlin',
    'Swift',
    'Angular',
    'Node.js',
    'AWS',
    'Accessibility',
  ],
} as const
