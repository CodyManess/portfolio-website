'use client'

import { useEffect } from 'react'

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
      <body className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
        <div className="max-w-md w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            A critical application error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center justify-center rounded-lg bg-[#007ab8] px-4 py-2 text-sm font-medium text-white hover:bg-[#196db2] transition-colors cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
