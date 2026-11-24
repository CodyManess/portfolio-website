import type { Metadata } from 'next'
import Link from 'next/link'
import StatusPageCard from '@/components/shared/status-page-card'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Page Not Found | ${siteConfig.name}`,
  description: 'The requested page could not be found.',
}

export default function NotFound() {
  return (
    <StatusPageCard
      eyebrow="404"
      title="Page Not Found"
      description="The page you are looking for does not exist or may have been moved."
      actions={
        <Link
          href="/"
          className={cn(
            buttonVariants({ size: 'lg' }),
            'h-10 rounded-full px-5 font-semibold'
          )}
        >
          Return Home
        </Link>
      }
    />
  )
}
