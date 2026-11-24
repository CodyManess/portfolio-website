import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SectionErrorAlertProps {
  message: string
  onRetry: () => void
  tone?: 'default' | 'inverted'
  className?: string
}

export function SectionErrorAlert({
  message,
  onRetry,
  tone = 'default',
  className,
}: SectionErrorAlertProps) {
  const isInverted = tone === 'inverted'

  return (
    <div
      role="alert"
      className={cn(
        'my-8 flex w-full flex-col items-center gap-3 rounded-2xl border p-6 text-center',
        isInverted
          ? 'border-white/20 bg-slate-950/30 text-white'
          : 'border-destructive/30 bg-destructive/5 text-destructive',
        className
      )}
    >
      <p className="text-sm font-medium sm:text-base">{message}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRetry}
        className={cn(
          isInverted &&
            'border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white focus-visible:ring-white dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20'
        )}
      >
        Retry
      </Button>
    </div>
  )
}

export default SectionErrorAlert
