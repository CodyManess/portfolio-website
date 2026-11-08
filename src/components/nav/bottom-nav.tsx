'use client'
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/links'
import { cn } from '@/lib/utils'

const BottomNav = () => {
  const pathname = usePathname()
  const [value, setValue] = React.useState(navLinks[0].title.toLowerCase())
  const activeValue = pathname?.startsWith('/extended') ? 'experience' : value

  React.useEffect(() => {
    if (pathname?.startsWith('/extended')) return

    const sectionIds = navLinks.map((page) => page.title.toLowerCase())

    const updateActiveSection = () => {
      const triggerLine = window.innerHeight * 0.35
      let currentSection = sectionIds[0]

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

    const rafId = window.requestAnimationFrame(updateActiveSection)
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [pathname])

  return (
    <nav
      aria-label="Mobile"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 items-center h-16 px-1">
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
                'group flex flex-col items-center justify-center gap-1 h-full px-1 min-w-0 transition-colors duration-200',
                isActive
                  ? 'text-[var(--primary-color)] dark:text-[var(--primary-light)] font-semibold'
                  : 'text-slate-500 dark:text-slate-400 font-medium hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-light)]'
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center px-3 py-1 rounded-full transition-all duration-200',
                  isActive
                    ? 'bg-[var(--primary-color)]/12 dark:bg-[var(--primary-light)]/15 text-[var(--primary-color)] dark:text-[var(--primary-light)]'
                    : 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800/70'
                )}
              >
                <page.icon className="text-base" aria-hidden="true" />
              </span>
              <span className="text-[11px] leading-none tracking-tight truncate max-w-full">
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
