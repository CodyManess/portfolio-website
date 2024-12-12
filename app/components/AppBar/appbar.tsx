'use client'
import * as React from 'react'
import { AppBar, Link, Slide, Toolbar, useScrollTrigger } from '@mui/material'
import { navLinks } from '../../data/links'

function HideOnScroll({
  children,
}: {
  children?: React.ReactElement<unknown>
}) {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  )
}

const PortfolioAppBar = () => {
  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar
          sx={{
            justifyContent: 'center',
            display: { xs: 'none', sm: 'flex' },
            background: 'var(--surface-color)',
          }}
        >
          {navLinks.map((page) => (
            <Link
              key={page.title}
              variant="h6"
              style={{
                display: 'block',
                margin: '2em 1em',
              }}
              href={`#${page.title.toLowerCase()}`}
            >
              {page.title}
            </Link>
          ))}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default PortfolioAppBar
