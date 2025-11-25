'use client'
import * as React from 'react'
import styles from './appbar.module.css'
import { navLinks } from '@/shared/data/links'
import Link from 'next/link'
import { useEffect } from 'react'

const PortfolioAppBar = () => {
  useEffect(() => {
    let prevScrollpos: number = window.scrollY

    const onScroll = function () {
      const currentScrollPos: number = window.scrollY
      const navbar = document.getElementById('navbar')
      if (!navbar) return

      if (prevScrollpos > currentScrollPos) {
        navbar.style.top = '0'
      } else {
        navbar.style.top = `-${navbar.clientHeight}px`
      }

      prevScrollpos = currentScrollPos
    }

    //add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true })
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav id="navbar" className={styles.appBar}>
      <ul className={styles.navList}>
        {navLinks.map((page) => (
          <li key={page.title}>
            <Link
              key={page.title}
              className={styles.navLink}
              href={`/#${page.title.toLowerCase()}`}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default PortfolioAppBar
