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
      <body className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-950 dark:bg-[#020617] dark:text-white">
        <main className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-sm/relaxed text-slate-600 dark:text-slate-300">
            A critical application error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#007ab8] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#196db2]"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
