'use client'
import * as React from 'react'
import { navLinks } from '@/data/links'
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
    <nav
      id="navbar"
      className="hidden sm:flex shadow-[var(--surface-shadow)] bg-[var(--toolbar-background)]/90 backdrop-blur-md transition-[top] duration-300 fixed z-[1100] top-0 right-0 flex-col w-full"
    >
      <ul className="flex justify-center list-none py-8 m-0">
        {navLinks.map((page) => (
          <li key={page.title}>
            <Link
              key={page.title}
              className="text-xl font-medium m-4 text-[var(--white)] underline-offset-4 decoration-[rgba(25,118,210,0.4)] hover:decoration-inherit"
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
