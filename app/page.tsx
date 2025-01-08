import Intro from './components/Intro/intro'
import PortfolioAppBar from './components/Nav/AppBar/appbar'
import Experience from './components/Experience/experience'
import Creds from './components/Credentials/creds'
import Projects from './components/Projects/projects'
import Footer from './components/Footer/footer'
import BottomNav from './components/Nav/BottomNav/bottomNav'
import About from './components/About/about'

export default function Home() {
  return (
    <>
      <PortfolioAppBar />

      <main>
        <Intro />

        <About />

        <Experience />

        <Creds />

        <Projects />
      </main>

      <Footer />

      <BottomNav />
    </>
  )
}
