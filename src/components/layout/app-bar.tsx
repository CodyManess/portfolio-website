'use client'
import { navLinks, type NavSectionId } from '@/data/links'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { getActiveSectionId } from '@/lib/navigation'
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
  const [value, setValue] = useState<NavSectionId>('home')
  const prevScrollPosRef = useRef(0)

  const isHidden = scrollState.path === pathname ? scrollState.hidden : false
  const activeValue: NavSectionId = pathname.startsWith('/extended')
    ? 'experience'
    : value

  useEffect(() => {
    prevScrollPosRef.current = Math.max(window.scrollY, 0)

    const mql =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(DESKTOP_MEDIA_QUERY)
        : null

    let rafId: number | undefined
    let isScheduled = false
    let isListening = false

    const updateActiveSection = () => {
      if (pathname.startsWith('/extended')) return
      setValue(getActiveSectionId())
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
    <header>
      <nav
        id="navbar"
        aria-label="Main"
        data-hidden={isHidden}
        className={cn(
          'fixed top-0 right-0 z-1100 hidden w-full flex-col bg-(--toolbar-background)/95 shadow-(--surface-shadow) backdrop-blur-md transition-transform duration-300 sm:flex',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <ul className="m-0 flex list-none justify-center py-6">
          {navLinks.map((page) => {
            const isActive = activeValue === page.id
            return (
              <li key={page.id}>
                <Link
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'mx-2 inline-block rounded-md px-3 py-2 text-xl underline-offset-8 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-(--toolbar-background) focus-visible:outline-none',
                    isActive
                      ? 'font-semibold text-white underline decoration-white decoration-2 dark:text-(--primary-light) dark:decoration-(--primary-light)'
                      : 'font-medium text-white/90 decoration-white/60 hover:text-white hover:underline dark:hover:text-(--primary-light) dark:hover:decoration-(--primary-light)/70'
                  )}
                  href={page.href}
                  onClick={() => setValue(page.id)}
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
    </header>
  )
}

export default PortfolioAppBar
