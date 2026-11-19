import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: `Page Not Found | ${siteConfig.name}`,
  description: 'The requested page could not be found.',
}

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[70vh] items-center justify-center px-4 py-16 outline-none"
    >
      <div className="w-full max-w-md space-y-4 rounded-3xl border border-slate-200/80 bg-(--surface-background) p-8 text-center shadow-lg dark:border-slate-800/60">
        <p className="text-xs font-semibold tracking-wider text-(--primary-color) uppercase dark:text-(--primary-light)">
          404
        </p>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h1>
        <p className="text-sm/relaxed text-muted-foreground">
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
