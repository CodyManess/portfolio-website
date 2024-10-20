import * as React from 'react';
import { AppBar, Box, Button } from '@mui/material';

const PortfolioAppBar = () => {

    const links = ['Home', 'Education', 'Experience', 'Skills']

    return (
        <AppBar position="static">
            <Box sx={{ justifyContent: "center", display: { sm: 'flex' } }}>
                {links.map((page) => (
                <Button
                    key={ page }
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    { page }
                </Button>
                ))}
            </Box>
        </AppBar>
    );
};

export default PortfolioAppBar;