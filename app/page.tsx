import Intro from '@/components/Intro/intro'
import Experience from '@/components/Experience/experience'
import Creds from '@/components/Credentials/creds'
import Projects from '@/components/Projects/projects'
import About from '@/components/About/about'

export default function Home() {
  return (
    <main>
      <Intro />

      <About />

      <Experience />

      <Creds />

      <Projects />
    </main>
  )
}
