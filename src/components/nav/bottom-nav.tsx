'use client'
import * as React from 'react'
import Link from 'next/link'
import { navLinks } from '@/data/links'
import { cn } from '@/lib/utils'

const BottomNav = () => {
  const [value, setValue] = React.useState(navLinks[0].title.toLowerCase())

  return (
    <nav
      aria-label="Mobile"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-lg bg-[var(--surface-background-transparent)] backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex justify-around items-center h-16">
        {navLinks.map((page) => {
          const id = page.title.toLowerCase()
          const isActive = value === id
          return (
            <Link
              key={id}
              href={`/#${id}`}
              onClick={() => setValue(id)}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-sm transition-colors',
                isActive
                  ? 'text-[var(--primary-color)]'
                  : 'text-[var(--primary-dark)] dark:text-[var(--primary-light)] opacity-70 hover:opacity-100'
              )}
            >
              <page.icon size="1.5em" className="mb-1" aria-hidden="true" />
              <span>{page.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
