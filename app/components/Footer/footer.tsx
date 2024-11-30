import { Container, Typography } from '@mui/material';
import React from 'react';
import ContactMe from '../Shared/ContactMe/contactme';
import styles from './footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Typography variant="h3" style={{ marginBottom: '1em' }}>
                    Thank you for visiting my website!
                </Typography>
                <Typography variant="h6">
                    This was built with the help of some wonderful technologies including Next.js, Material-UI, and TypeScript.<br />
                    If you would like to see the source code for this website, please visit my GitHub page. <br/>
                    If you have any feedback, feel free to add an issue to the repo or reach out to me directly.  I would love to hear from you!
                </Typography>
                <Container style={{ margin: '1em'}}>
                    <ContactMe />
                </Container>
            </Container>
        </footer>
    );
};

export default Footer;