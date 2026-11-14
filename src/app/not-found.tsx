import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-slate-200/80 dark:border-slate-800/60 bg-(--surface-background) p-8 text-center shadow-lg space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-(--primary-color) dark:text-(--primary-light)">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="pt-2">
          <Link href="/" className={cn(buttonVariants())}>
            Return Home
          </Link>
        </div>
      </div>
    </main>
  )
}
