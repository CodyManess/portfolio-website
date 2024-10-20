import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Intro from './components/Intro/intro';
import PortfolioAppBar from './components/AppBar/appbar';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <>
      <PortfolioAppBar />
      
      <main>
        <Intro />

        <Container
          sx={{
            background: 'white',
            boxShadow: '0px 5px 5px black',
          }}
        >
          {/* School */}

          {/* Work Experience */}

          {/* Projects */}

          {/* Skills */}
        </Container>
      </main>

      <footer>
        Thank you for viewing my website!
      </footer>
    </>
  );
}
