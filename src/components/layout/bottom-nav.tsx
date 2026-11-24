'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, type NavSectionId } from '@/data/links'
import { getActiveSectionId } from '@/lib/navigation'
import { cn } from '@/lib/utils'

const MOBILE_MEDIA_QUERY = '(max-width: 639px)'

const BottomNav = () => {
  const pathname = usePathname()
  const [value, setValue] = useState<NavSectionId>('home')
  const isExtendedPage = pathname.startsWith('/extended')
  const isResumePage = pathname.startsWith('/resume')
  const activeValue: NavSectionId | null = isExtendedPage
    ? 'experience'
    : isResumePage
      ? null
      : value

  useEffect(() => {
    if (pathname.startsWith('/extended') || pathname.startsWith('/resume')) {
      return
    }

    const mql =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(MOBILE_MEDIA_QUERY)
        : null

    let rafId: number | undefined
    let isScheduled = false
    let isListening = false

    const scheduleUpdate = () => {
      if (isScheduled) return
      isScheduled = true
      rafId = window.requestAnimationFrame(() => {
        isScheduled = false
        rafId = undefined
        setValue(getActiveSectionId())
      })
    }

    const syncListener = () => {
      const isMobile = mql ? mql.matches : true
      if (isMobile && !isListening) {
        scheduleUpdate()
        window.addEventListener('scroll', scheduleUpdate, { passive: true })
        window.addEventListener('hashchange', scheduleUpdate)
        isListening = true
      } else if (!isMobile && isListening) {
        window.removeEventListener('scroll', scheduleUpdate)
        window.removeEventListener('hashchange', scheduleUpdate)
        if (rafId !== undefined) {
          window.cancelAnimationFrame(rafId)
          rafId = undefined
        }
        isScheduled = false
        isListening = false
      }
    }

    syncListener()
    mql?.addEventListener('change', syncListener)

    return () => {
      mql?.removeEventListener('change', syncListener)
      if (isListening) {
        window.removeEventListener('scroll', scheduleUpdate)
        window.removeEventListener('hashchange', scheduleUpdate)
      }
      if (rafId !== undefined) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [pathname])

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:hidden print:hidden"
    >
      <div className="grid h-16 grid-cols-5 items-center px-1">
        {navLinks.map((page) => {
          const isActive = activeValue === page.id
          return (
            <Link
              key={page.id}
              href={page.href}
              onClick={() => setValue(page.id)}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'group flex h-full min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset',
                isActive
                  ? 'font-semibold text-brand-strong'
                  : 'font-medium text-muted-foreground hover:text-brand-strong'
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center rounded-full px-3 py-1 transition-all duration-200',
                  isActive
                    ? 'bg-brand/12 text-brand-strong dark:bg-brand/15'
                    : 'group-hover:bg-muted'
                )}
              >
                <page.icon className="text-base" aria-hidden="true" />
              </span>
              <span className="max-w-full truncate text-2xs leading-none tracking-tight">
                {page.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
