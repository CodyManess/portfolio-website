import Link from 'next/link'
import type { ComponentProps } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface BackLinkProps {
  href: ComponentProps<typeof Link>['href']
  label?: string
  className?: string
}

export function BackLink({
  href,
  label = 'Back to Portfolio',
  className,
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-2xs transition-all duration-200 hover:border-brand/40 hover:bg-muted/50 hover:text-brand hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:text-base',
        className
      )}
    >
      <FaArrowLeft
        className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0"
        aria-hidden="true"
      />
      <span>{label}</span>
    </Link>
  )
}

export default BackLink
