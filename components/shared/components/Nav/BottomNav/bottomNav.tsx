'use client'
import * as React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Link,
  Paper,
} from '@mui/material'
import { navLinks } from '@/shared/data/links'
import styles from './bottomNav.module.css'

const BottomNav = () => {
  const [value, setValue] = React.useState(navLinks[0].title.toLowerCase())

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Paper
      className="sm:hidden fixed bottom-0 left-0 right-0 z-10 rounded-t-lg"
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        style={{ backgroundColor: 'var(--surface-color)' }}
      >
        {navLinks.map((page) => (
          <BottomNavigationAction
            className={styles.navButton}
            key={page.title.toLowerCase()}
            component={Link}
            href={`/#${page.title.toLowerCase()}`}
            label={page.title}
            value={page.title.toLowerCase()}
            icon={<page.icon size="1.5em" />}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
