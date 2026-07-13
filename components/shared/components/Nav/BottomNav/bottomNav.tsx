'use client'
import * as React from 'react'
import Link from 'next/link'
import { navLinks } from '@/shared/data/links'

const BottomNav = () => {
  const [value, setValue] = React.useState(navLinks[0].title.toLowerCase())

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-lg bg-[var(--surface-background-transparent)] backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((page) => {
          const isActive = value === page.title.toLowerCase()
          return (
            <Link
              key={page.title.toLowerCase()}
              href={`/#${page.title.toLowerCase()}`}
              onClick={() => setValue(page.title.toLowerCase())}
              className={`flex flex-col items-center justify-center w-full h-full text-sm transition-colors ${
                isActive
                  ? 'text-[var(--primary-color)]'
                  : 'text-[var(--primary-dark)] dark:text-[var(--primary-light)] opacity-70 hover:opacity-100'
              }`}
            >
              <page.icon size="1.5em" className="mb-1" />
              <span>{page.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
