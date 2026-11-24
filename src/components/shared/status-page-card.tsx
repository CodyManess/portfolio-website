import type { ReactNode } from 'react'
import { Overline } from '@/components/shared/page-section'

interface StatusPageCardProps {
  eyebrow?: string
  title: string
  description: string
  actions: ReactNode
}

export function StatusPageCard({
  eyebrow,
  title,
  description,
  actions,
}: StatusPageCardProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-16 outline-none sm:min-h-[75vh] sm:pt-36 sm:pb-20"
    >
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-border/80 bg-card bg-linear-to-br from-white to-slate-50/50 p-8 text-center shadow-lg dark:border-border/50 dark:from-slate-900/80 dark:to-slate-950/90">
        {eyebrow ? (
          <Overline as="p" className="text-brand">
            {eyebrow}
          </Overline>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm/relaxed text-muted-foreground">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {actions}
        </div>
      </div>
    </main>
  )
}

export default StatusPageCard
