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
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[70vh] items-center justify-center px-4 py-16 outline-none"
    >
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200/80 bg-(--surface-background) p-8 text-center shadow-lg dark:border-slate-800/60">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Something went wrong
        </h1>
        <p className="text-sm/relaxed text-muted-foreground">
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
