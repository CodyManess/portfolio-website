'use client'
import * as React from 'react'
import { navLinks } from '@/data/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const DESKTOP_MEDIA_QUERY = '(min-width: 640px)'

const PortfolioAppBar = () => {
  const pathname = usePathname()
  const [scrollState, setScrollState] = useState({
    hidden: false,
    path: pathname,
  })
  const prevScrollPosRef = useRef(0)

  const isHidden = scrollState.path === pathname ? scrollState.hidden : false

  useEffect(() => {
    prevScrollPosRef.current = Math.max(window.scrollY, 0)

    const mql =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(DESKTOP_MEDIA_QUERY)
        : null

    let rafId: number | undefined
    let isScheduled = false
    let isListening = false

    const updateVisibility = () => {
      const currentScrollPos = Math.max(window.scrollY, 0)
      const prevScrollPos = prevScrollPosRef.current

      if (currentScrollPos <= 0 || prevScrollPos > currentScrollPos) {
        setScrollState({ hidden: false, path: pathname })
      } else if (currentScrollPos > prevScrollPos) {
        setScrollState({ hidden: true, path: pathname })
      }

      prevScrollPosRef.current = currentScrollPos
    }

    const onScroll = () => {
      if (isScheduled) return
      isScheduled = true
      rafId = window.requestAnimationFrame(() => {
        isScheduled = false
        rafId = undefined
        updateVisibility()
      })
    }

    const syncListener = () => {
      const isDesktop = mql ? mql.matches : true
      if (isDesktop && !isListening) {
        prevScrollPosRef.current = Math.max(window.scrollY, 0)
        window.addEventListener('scroll', onScroll, { passive: true })
        isListening = true
      } else if (!isDesktop && isListening) {
        window.removeEventListener('scroll', onScroll)
        if (rafId !== undefined) {
          window.cancelAnimationFrame(rafId)
          rafId = undefined
        }
        isScheduled = false
        setScrollState({ hidden: false, path: pathname })
        isListening = false
      }
    }

    syncListener()
    mql?.addEventListener('change', syncListener)

    return () => {
      mql?.removeEventListener('change', syncListener)
      if (isListening) {
        window.removeEventListener('scroll', onScroll)
      }
      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [pathname])

  return (
    <nav
      id="navbar"
      aria-label="Main"
      data-hidden={isHidden}
      onFocus={() => setScrollState({ hidden: false, path: pathname })}
      className={cn(
        'hidden sm:flex shadow-[var(--surface-shadow)] bg-[var(--toolbar-background)]/90 backdrop-blur-md transition-transform duration-300 fixed z-[1100] top-0 right-0 flex-col w-full',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <ul className="flex justify-center list-none py-8 m-0">
        {navLinks.map((page) => (
          <li key={page.title}>
            <Link
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
