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

const getNavLinkClass = (isActive: boolean) =>
  cn(
    'mx-0.5 inline-block rounded-md px-2.5 py-2 text-base underline-offset-8 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-toolbar focus-visible:outline-none md:mx-1.5 md:px-3 md:text-lg lg:mx-2 lg:text-xl',
    isActive
      ? 'font-semibold text-white underline decoration-white decoration-2 dark:text-brand-light dark:decoration-brand-light'
      : 'font-medium text-white/90 decoration-white/60 hover:text-white hover:underline dark:hover:text-brand-light dark:hover:decoration-brand-light/70'
  )

const PortfolioAppBar = () => {
  const pathname = usePathname()
  const [scrollState, setScrollState] = useState({
    hidden: false,
    path: pathname,
  })
  const [value, setValue] = useState<NavSectionId>('home')
  const prevScrollPosRef = useRef(0)

  const isExtendedPage = pathname.startsWith('/extended')
  const isResumePage = pathname.startsWith('/resume')
  const isHidden = scrollState.path === pathname ? scrollState.hidden : false
  const activeValue: NavSectionId | null = isExtendedPage
    ? 'experience'
    : isResumePage
      ? null
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
      if (pathname.startsWith('/extended') || pathname.startsWith('/resume')) {
        return
      }
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
    <header className="print:hidden">
      <nav
        id="navbar"
        aria-label="Main"
        data-hidden={isHidden}
        className={cn(
          'fixed top-0 right-0 z-30 hidden w-full flex-col bg-toolbar/95 shadow-surface backdrop-blur-md transition-transform duration-300 sm:flex',
          isHidden ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <ul className="m-0 flex list-none justify-center py-5 md:py-6">
          {navLinks.map((page) => {
            const isActive = activeValue === page.id
            return (
              <li key={page.id}>
                <Link
                  aria-current={isActive ? 'location' : undefined}
                  className={getNavLinkClass(isActive)}
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
          <li>
            <Link
              aria-current={isResumePage ? 'page' : undefined}
              className={getNavLinkClass(isResumePage)}
              href="/resume"
              onFocus={() => setScrollState({ hidden: false, path: pathname })}
            >
              Resume
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default PortfolioAppBar
