'use client'
import React, { useId, useRef } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface AccordionProps {
  index: number
  expanded: number | false
  setExpanded: (index: number | false) => void
  children: React.ReactNode
  className?: string
}

interface AccordionChildrenProps {
  children: React.ReactNode
}

export function Accordion(props: AccordionProps) {
  const accordionHeader = useRef<HTMLButtonElement>(null)
  // useId guarantees unique, SSR-safe ids even when multiple accordion groups
  // (e.g. several timelines) are rendered on the same page.
  const id = useId()
  const headerId = `${id}-header`
  const panelId = `${id}-panel`
  const isOpen = props.expanded === props.index

  let header
  let body

  const toggleAccordion = () => {
    if (isOpen) {
      accordionHeader.current?.blur()
    }
    props.setExpanded(isOpen ? false : props.index)
  }

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === AccordionHeader) {
      header = child
    } else if (child.type === AccordionBody) {
      body = child
    }
  })

  return (
    <div
      className={cn(
        'group data-[active=true]:border-[var(--primary-color)]/40 dark:data-[active=true]:border-[var(--primary-light)]/50 data-[active=true]:shadow-[0_12px_30px_rgba(0,122,184,0.12)]',
        props.className
      )}
      data-active={isOpen}
    >
      {!!header && (
        <button
          ref={accordionHeader}
          type="button"
          className="flex items-center justify-between gap-2.5 sm:gap-4 transition-all duration-300 p-3.5 sm:p-5 w-full bg-transparent text-inherit border-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)] focus-visible:rounded-2xl"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headerId}
        >
          <div className="text-left flex-1 min-w-0">{header}</div>
          <span
            className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center self-center rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 transition-all duration-300 group-hover:border-[var(--primary-color)]/30 group-hover:bg-[var(--primary-color)]/10 group-hover:text-[var(--primary-color)] dark:group-hover:border-[var(--primary-light)]/40 dark:group-hover:bg-[var(--primary-light)]/15 dark:group-hover:text-[var(--primary-light)] group-data-[active=true]:border-transparent group-data-[active=true]:bg-[var(--primary-color)] group-data-[active=true]:text-white dark:group-data-[active=true]:bg-[var(--primary-light)] dark:group-data-[active=true]:text-slate-950"
            aria-hidden="true"
          >
            <FaAngleDown className="text-sm sm:text-base transition-transform duration-300 group-data-[active=true]:rotate-180" />
          </span>
        </button>
      )}

      {!!body && (
        // Animating grid-template-rows between 0fr and 1fr lets CSS handle the
        // expand/collapse transition without measuring scrollHeight in JS, and
        // keeps the height correct when the content reflows (e.g. on resize).
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
          id={panelId}
          role="region"
          aria-labelledby={headerId}
          inert={!isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-3.5 sm:px-5 pb-4 sm:pb-5">{body}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export function AccordionHeader(props: AccordionChildrenProps) {
  return <>{props.children}</>
}

export function AccordionBody(props: AccordionChildrenProps) {
  return <>{props.children}</>
}
