'use client'

import { FaPrint } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'

export default function PrintResumeButton() {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className="h-10 gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-brand-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 sm:text-base"
    >
      <FaPrint className="size-3.5" aria-hidden="true" />
      <span>Print / Save PDF</span>
    </Button>
  )
}
