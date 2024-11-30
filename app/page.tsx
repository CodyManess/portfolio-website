import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
