'use client'
import * as React from 'react'
import { navLinks } from '@/data/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const DESKTOP_MEDIA_QUERY = '(min-width: 640px)'
const SCROLL_DELTA_THRESHOLD = 10
const HIDE_SCROLL_OFFSET = 64

const PortfolioAppBar = () => {
  const pathname = usePathname()
  const [scrollState, setScrollState] = useState({
    hidden: false,
    path: pathname,
  })
  const [value, setValue] = useState(navLinks[0]?.title.toLowerCase() ?? 'home')
  const prevScrollPosRef = useRef(0)

  const isHidden = scrollState.path === pathname ? scrollState.hidden : false
  const activeValue = pathname.startsWith('/extended') ? 'experience' : value

  useEffect(() => {
    prevScrollPosRef.current = Math.max(window.scrollY, 0)

    const mql =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(DESKTOP_MEDIA_QUERY)
        : null

    const sectionIds = navLinks.map((page) => page.title.toLowerCase())

    let rafId: number | undefined
    let isScheduled = false
    let isListening = false

    const updateActiveSection = () => {
      if (pathname.startsWith('/extended')) return

      const triggerLine = window.innerHeight * 0.35
      let currentSection = sectionIds[0] ?? 'home'

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= triggerLine) {
            currentSection = id
          }
        }
      }

      setValue(currentSection)
    }

    const updateOnScroll = () => {
      const currentScrollPos = Math.max(window.scrollY, 0)
      const prevScrollPos = prevScrollPosRef.current
      const delta = currentScrollPos - prevScrollPos

      if (currentScrollPos <= HIDE_SCROLL_OFFSET) {
        setScrollState({ hidden: false, path: pathname })
        prevScrollPosRef.current = currentScrollPos
      } else if (Math.abs(delta) >= SCROLL_DELTA_THRESHOLD) {
        setScrollState({ hidden: delta > 0, path: pathname })
        prevScrollPosRef.current = currentScrollPos
      }

      updateActiveSection()
    }

    const onScroll = () => {
      if (isScheduled) return
      isScheduled = true
      rafId = window.requestAnimationFrame(() => {
        isScheduled = false
        rafId = undefined
        updateOnScroll()
      })
    }

    const syncListener = () => {
      const isDesktop = mql ? mql.matches : true
      if (isDesktop && !isListening) {
        prevScrollPosRef.current = Math.max(window.scrollY, 0)
        updateActiveSection()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('hashchange', onScroll)
        isListening = true
      } else if (!isDesktop && isListening) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('hashchange', onScroll)
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
        window.removeEventListener('hashchange', onScroll)
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
        {navLinks.map((page) => {
          const id = page.title.toLowerCase()
          const isActive = activeValue === id
          return (
            <li key={page.title}>
              <Link
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'm-4 text-xl underline-offset-8 transition-colors duration-200',
                  isActive
                    ? 'font-semibold text-(--primary-light) underline decoration-(--primary-light) decoration-2'
                    : 'font-medium text-(--white) decoration-[rgba(25,118,210,0.4)] hover:text-(--primary-light) hover:underline'
                )}
                href={`/#${id}`}
                onClick={() => setValue(id)}
                onFocus={() =>
                  setScrollState({ hidden: false, path: pathname })
                }
              >
                {page.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PortfolioAppBar
