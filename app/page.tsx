import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Intro from './components/Intro/intro';
import PortfolioAppBar from './components/AppBar/appbar';
import Experience from './components/Experience/experience';

export default function Home() {
  return (
    <>
      <PortfolioAppBar />
      
      <main>
        <Intro />

        <div
          style={{
            background: 'white',
            boxShadow: '0px -12px 20px black',
            padding: '4em 0'
          }}
        >
          {/* School */}

          <Experience />

          {/* Projects */}

          {/* Skills */}
        </div>
      </main>

      <footer>
        Thank you for viewing my website!
      </footer>
    </>
  );
}
