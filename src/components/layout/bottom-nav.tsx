'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/links'
import { cn } from '@/lib/utils'

const MOBILE_MEDIA_QUERY = '(max-width: 639px)'

const BottomNav = () => {
  const pathname = usePathname()
  const [value, setValue] = React.useState(
    navLinks[0]?.title.toLowerCase() ?? 'home'
  )
  const activeValue = pathname.startsWith('/extended') ? 'experience' : value

  React.useEffect(() => {
    if (pathname.startsWith('/extended')) return

    const mql =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(MOBILE_MEDIA_QUERY)
        : null

    const sectionIds = navLinks.map((page) => page.title.toLowerCase())

    const updateActiveSection = () => {
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

    let rafId: number | undefined
    let isScheduled = false
    let isListening = false

    const scheduleUpdate = () => {
      if (isScheduled) return
      isScheduled = true
      rafId = window.requestAnimationFrame(() => {
        isScheduled = false
        rafId = undefined
        updateActiveSection()
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:hidden dark:border-slate-800/80 dark:bg-slate-900/95"
    >
      <div className="grid h-16 grid-cols-5 items-center px-1">
        {navLinks.map((page) => {
          const id = page.title.toLowerCase()
          const isActive = activeValue === id
          return (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setValue(id)}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'group flex h-full min-w-0 flex-col items-center justify-center gap-1 px-1 transition-colors duration-200',
                isActive
                  ? 'font-semibold text-(--primary-dark) dark:text-(--primary-light)'
                  : 'font-medium text-slate-600 hover:text-(--primary-dark) dark:text-slate-400 dark:hover:text-(--primary-light)'
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center rounded-full px-3 py-1 transition-all duration-200',
                  isActive
                    ? 'bg-(--primary-color)/12 text-(--primary-dark) dark:bg-(--primary-light)/15 dark:text-(--primary-light)'
                    : 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/70'
                )}
              >
                <page.icon className="text-base" aria-hidden="true" />
              </span>
              <span className="max-w-full truncate text-[11px] leading-none tracking-tight">
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
