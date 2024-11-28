import { Box, Container } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <Box sx={{
            bgcolor: 'primary.dark',
            padding: '4em 0'
        }}>
            <footer>
                <Container>
                    Thank you for visiting my website!
                </Container>
            </footer>
        </Box>
    );
};

export default Footer;