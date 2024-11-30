import Intro from './components/Intro/intro';
import PortfolioAppBar from './components/AppBar/appbar';
import Experience from './components/Experience/experience';
import Education from './components/Education/education';
import Projects from './components/Projects/projects';
import Footer from './components/Footer/footer';

export default function Home() {
  return (
    <>
      <PortfolioAppBar />
      
      <main>
        <Intro />

        <Experience />

        <Education />

        <Projects />
      </main>

      <Footer />
    </>
  );
}
