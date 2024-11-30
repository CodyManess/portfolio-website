'use client'
import * as React from 'react';
import { AppBar, Box, Button, Link, Slide, Toolbar, useScrollTrigger } from '@mui/material';

function HideOnScroll({ children }: {children?: React.ReactElement<unknown>}) {
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children ?? <div />}
      </Slide>
    );
}
  

const PortfolioAppBar = () => {

    const links = ['Intro', 'Education', 'Experience', 'Projects']

    return (
        <HideOnScroll>
            <AppBar>
                <Toolbar sx={{ 
                    justifyContent: "center", 
                    display: { sm: 'flex' },
                    background: 'var(--surface-color)'
                }}>
                    {links.map((page) => (
                    <Link
                        key={ page }
                        variant="h6"
                        style={{ 
                            display: 'block', 
                            margin: '2em 1em' 
                        }}
                        href={`#${page.toLowerCase()}`}
                    >
                        { page }
                    </Link>
                    ))}
                </Toolbar>
            </AppBar>
        </HideOnScroll>
    );
};

export default PortfolioAppBar;