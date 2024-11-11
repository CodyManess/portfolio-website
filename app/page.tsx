import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Intro from './components/Intro/intro';
import PortfolioAppBar from './components/AppBar/appbar';
import Experience from './components/Experience/experience';
import Education from './components/Education/education';
import Projects from './components/Projects/projects';

export default function Home() {
  return (
    <>
      <PortfolioAppBar />
      
      <main>
        <Intro />

        <div>
          <Experience />

          <Education />

          <Projects />

          {/* Skills */}
        </div>
      </main>

      <footer>
        Thank you for viewing my website!
      </footer>
    </>
  );
}
