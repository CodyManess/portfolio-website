'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Error({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error('Unhandled route error:', error)
  }, [error])

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-[var(--surface-background)] p-8 text-center shadow-lg space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          An unexpected error occurred while rendering this page. You can try
          reloading the view or return to the home page.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button type="button" onClick={() => retry()}>
            Try again
          </Button>
          <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
