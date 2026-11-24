'use client'

import { useEffect } from 'react'
import './globals.css'

export default function GlobalError({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error('Unhandled global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <main className="w-full max-w-md space-y-4 rounded-3xl border border-border/80 bg-card bg-linear-to-br from-white to-slate-50/50 p-8 text-center shadow-xl dark:border-border/50 dark:from-slate-900/80 dark:to-slate-950/90">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Something went wrong
          </h1>
          <p className="text-sm/relaxed text-muted-foreground">
            A critical application error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
