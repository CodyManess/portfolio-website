'use client'
import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Link } from '@mui/material';
import { navLinks } from '@/app/data/links';

const BottomNav = () => {
    const [value, setValue] = React.useState(navLinks[0].title.toLowerCase());
    return (
        <Box 
            sx={{ 
                display: { sm: 'none' },
                position: 'fixed', bottom: 0, left: 0, right: 0 
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                {
                    navLinks.map((page) => (
                        <BottomNavigationAction 
                            key={page.title}
                            component={Link} 
                            href={`#${page.title.toLowerCase()}`} 
                            label={page.title} 
                            value={page.title.toLowerCase()} 
                            icon={<page.icon />} 
                        />
                    ))
                }
            </BottomNavigation>
        </Box>
    );
}

export default BottomNav;