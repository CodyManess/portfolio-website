'use client'
import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Link, Paper } from '@mui/material';
import { navLinks } from '@/data/links';

const BottomNav = () => {
    const [value, setValue] = React.useState(navLinks[0].title.toLowerCase());

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };

    return (
        <Paper 
            sx={{ 
                display: { sm: 'none' },
                position: 'fixed', bottom: 0, left: 0, right: 0 
            }}
            elevation={3}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
                style={{ backgroundColor: 'var(--surface-color)' }}
            >
                {
                    navLinks.map((page) => (
                        <BottomNavigationAction
                            style={{ color: 'var(--primary-light)' }}
                            key={page.title.toLowerCase()}
                            component={Link} 
                            href={`#${page.title.toLowerCase()}`} 
                            label={page.title} 
                            value={page.title.toLowerCase()} 
                            icon={<page.icon />} 
                        />
                    ))
                }
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;