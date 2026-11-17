import Intro from '@/components/sections/intro/intro'
import Experience from '@/components/sections/experience'
import Credentials from '@/components/sections/credentials/credentials'
import Projects from '@/components/sections/projects/projects'
import About from '@/components/sections/about'
import { siteConfig } from '@/config/site'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImagePath}`,
  sameAs: [...siteConfig.sameAs],
  homeLocation: {
    '@type': 'Place',
    name: siteConfig.location,
  },
  worksFor: {
    '@type': 'Organization',
    name: siteConfig.employer,
  },
  alumniOf: siteConfig.alumniOf.map((school) => ({
    '@type': 'CollegeOrUniversity',
    name: school.name,
    url: school.url,
  })),
  knowsAbout: [...siteConfig.knowsAbout],
  description: siteConfig.shortDescription,
}

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, '\\u003c'),
        }}
      />
      <Intro />

      <About />

      <Experience />

      <Credentials />

      <Projects />
    </main>
  )
}
