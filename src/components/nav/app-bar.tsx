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
      className={cn(
        'fixed top-0 right-0 z-1100 hidden w-full flex-col bg-(--toolbar-background)/90 shadow-(--surface-shadow) backdrop-blur-md transition-transform duration-300 sm:flex',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <ul className="m-0 flex list-none justify-center py-8">
        {navLinks.map((page) => (
          <li key={page.title}>
            <Link
              className="m-4 text-xl font-medium text-(--white) decoration-[rgba(25,118,210,0.4)] underline-offset-4 hover:decoration-inherit"
              href={`/#${page.title.toLowerCase()}`}
              onFocus={() => setScrollState({ hidden: false, path: pathname })}
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
