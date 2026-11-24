import type { ReactNode } from 'react'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ExternalActionLinkProps {
  href: string
  children: ReactNode
  variant?: 'default' | 'brand-outline' | 'outline'
  size?: 'sm' | 'default'
  className?: string
}

export function ExternalActionLink({
  href,
  children,
  variant = 'brand-outline',
  size = 'sm',
  className,
}: ExternalActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
      <FaArrowUpRightFromSquare
        className="size-3 shrink-0"
        aria-hidden="true"
      />
    </a>
  )
}

export default ExternalActionLink
