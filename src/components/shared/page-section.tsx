import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageSectionProps {
  id?: string
  tone?: 'default' | 'brand'
  className?: string
  containerClassName?: string
  children: ReactNode
}

export function PageSection({
  id,
  tone = 'default',
  className,
  containerClassName,
  children,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'flex justify-center py-16 md:py-20',
        tone === 'brand' && 'bg-section text-white',
        className
      )}
    >
      <div className={cn('container mx-auto px-4 lg:px-6', containerClassName)}>
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  as?: 'h1' | 'h2'
  className?: string
  children: ReactNode
}

export function SectionHeading({
  as: Component = 'h2',
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Component
      className={cn(
        'text-[2rem]/tight font-light tracking-tight sm:text-[3.25rem]',
        className
      )}
    >
      {children}
    </Component>
  )
}

interface OverlineProps {
  as?: 'h2' | 'h3' | 'h4' | 'p' | 'span'
  className?: string
  children: ReactNode
}

export function Overline({
  as: Component = 'h3',
  className,
  children,
}: OverlineProps) {
  return (
    <Component
      className={cn(
        'text-xs font-semibold tracking-wider text-muted-foreground uppercase',
        className
      )}
    >
      {children}
    </Component>
  )
}
