'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import StatusPageCard from '@/components/shared/status-page-card'
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
    <StatusPageCard
      title="Something went wrong"
      description="An unexpected error occurred while rendering this page. You can try reloading the view or return to the home page."
      actions={
        <>
          <Button
            type="button"
            size="lg"
            className="h-10 rounded-full px-5 font-semibold"
            onClick={() => retry()}
          >
            Try again
          </Button>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-10 rounded-full px-5 font-semibold'
            )}
          >
            Return Home
          </Link>
        </>
      }
    />
  )
}
