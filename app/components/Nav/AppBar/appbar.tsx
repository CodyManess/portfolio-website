'use client'
import * as React from 'react'
import { Slide, useScrollTrigger, AppBar } from '@mui/material'
import styles from './appbar.module.css'
import { navLinks } from '../../../data/links'

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
      <AppBar className={styles.appBar}>
        <nav>
          <ul className={styles.navList}>
            {navLinks.map((page) => (
              <li key={page.title}>
                <a
                  key={page.title}
                  className={styles.navLink}
                  href={`#${page.title.toLowerCase()}`}
                >
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </AppBar>
    </HideOnScroll>
  )
}

export default PortfolioAppBar
