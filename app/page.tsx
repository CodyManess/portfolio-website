import Intro from '@/components/Intro/intro'
import Experience from '@/components/Experience/experience'
import Creds from '@/components/Credentials/creds'
import Projects from '@/components/Projects/projects'
import About from '@/components/About/about'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cody Maness',
  jobTitle: 'Web & Mobile Developer',
  url: 'https://codymaness.com',
  sameAs: [
    'https://github.com/CodyManess',
    'https://www.linkedin.com/in/cody-maness/',
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
