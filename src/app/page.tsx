import Intro from '@/components/intro/intro'
import Experience from '@/components/experience/experience'
import Creds from '@/components/credentials/creds'
import Projects from '@/components/projects/projects'
import About from '@/components/about/about'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cody Maness',
  jobTitle: 'Web & Mobile Developer',
  url: 'https://codymaness.com',
  image: 'https://codymaness.com/opengraph-image',
  sameAs: [
    'https://github.com/CodyManess',
    'https://www.linkedin.com/in/cody-maness/',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'The Cigna Group',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Middle Tennessee State University',
      url: 'https://www.mtsu.edu/',
    },
    {
      '@type': 'CollegeOrUniversity',
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
  description:
    'Mobile and Web Developer with a love for creating engaging, accessible, and user-friendly applications.',
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Intro />

      <About />

      <Experience />

      <Creds />

      <Projects />
    </main>
  )
}
