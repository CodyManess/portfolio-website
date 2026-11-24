'use client'
import {
  Children,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface AccordionProps {
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
  className?: string
}

interface AccordionChildrenProps {
  children: ReactNode
}

export function Accordion({
  isOpen,
  onToggle,
  children,
  className,
}: AccordionProps) {
  // useId guarantees unique, SSR-safe ids even when multiple accordion groups
  // (e.g. several timelines) are rendered on the same page.
  const id = useId()
  const headerId = `${id}-header`
  const panelId = `${id}-panel`

  let header: ReactElement | undefined
  let body: ReactElement | undefined

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (child.type === AccordionHeader) {
      header = child
    } else if (child.type === AccordionBody) {
      body = child
    }
  })

  return (
    <div
      className={cn(
        'group data-[active=true]:border-brand/40 data-[active=true]:shadow-card-hover',
        className
      )}
      data-active={isOpen}
    >
      {!!header && (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between gap-2.5 border-none bg-transparent p-3.5 text-inherit transition-all duration-300 outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-ring sm:gap-4 sm:p-5"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headerId}
        >
          <div className="min-w-0 flex-1 text-left">{header}</div>
          <span
            className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border border-border/80 bg-muted/80 text-muted-foreground transition-all duration-300 group-hover:border-brand/35 group-hover:bg-brand/12 group-hover:text-brand group-data-[active=true]:border-transparent group-data-[active=true]:bg-brand group-data-[active=true]:text-white sm:size-9 dark:group-data-[active=true]:text-slate-950"
            aria-hidden="true"
          >
            <FaAngleDown className="text-sm transition-transform duration-300 group-data-[active=true]:rotate-180 sm:text-base" />
          </span>
        </button>
      )}

      {!!body && (
        // Animating grid-template-rows between 0fr and 1fr lets CSS handle the
        // expand/collapse transition without measuring scrollHeight in JS, and
        // keeps the height correct when the content reflows (e.g. on resize).
        <section
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out print:grid-rows-[1fr]',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
          id={panelId}
          aria-labelledby={headerId}
          inert={!isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-3.5 pb-4 sm:px-5 sm:pb-5">{body}</div>
          </div>
        </section>
      )}
    </div>
  )
}

export function AccordionHeader(props: AccordionChildrenProps) {
  return props.children
}

export function AccordionBody(props: AccordionChildrenProps) {
  return props.children
}
