'use client'

import { FaPrint } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'

export default function PrintResumeButton() {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className="h-10 cursor-pointer gap-2 rounded-full bg-(--primary-color) px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--primary-dark) hover:shadow-[0_8px_20px_rgba(0,122,184,0.25)] focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2 sm:text-base dark:focus-visible:ring-(--primary-light)"
    >
      <FaPrint className="size-3.5" aria-hidden="true" />
      <span>Print / Save PDF</span>
    </Button>
  )
}
