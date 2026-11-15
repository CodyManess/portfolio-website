import { socialLinks } from '@/data/links'

export const siteConfig = {
  url: 'https://codymaness.com',
  name: 'Cody Maness',
  role: 'Web & Mobile Developer',
  title: 'Cody Maness | Full-Stack Developer',
  description:
    'Full-Stack Web & Mobile Developer building accessible, scalable, and engaging digital experiences.',
  shortDescription:
    'Mobile and Web Developer with a love for creating engaging, accessible, and user-friendly applications.',
  ogTagline:
    'Creating accessible, scalable, and engaging web & mobile applications.',
  ogImagePath: '/opengraph-image',
  extendedTitle: 'Cody Maness | Extended Work History',
  extendedDescription:
    'An extra page within my portfolio detailing past jobs worked before and during college.',
  lastModified: '2026-11-14',
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
    'Kotlin',
    'Swift',
    'Angular',
    'Node.js',
  ],
} as const
