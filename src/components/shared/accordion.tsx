'use client'
import React, { useId } from 'react'
import { FaAngleDown } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface AccordionProps {
  index: number
  expanded?: number | false
  setExpanded?: (index: number | false) => void
  isOpen?: boolean
  onToggle?: () => void
  children: React.ReactNode
  className?: string
}

interface AccordionChildrenProps {
  children: React.ReactNode
}

export function Accordion(props: AccordionProps) {
  // useId guarantees unique, SSR-safe ids even when multiple accordion groups
  // (e.g. several timelines) are rendered on the same page.
  const id = useId()
  const headerId = `${id}-header`
  const panelId = `${id}-panel`
  const isOpen =
    props.isOpen !== undefined ? props.isOpen : props.expanded === props.index

  let header: React.ReactElement | undefined
  let body: React.ReactElement | undefined

  const toggleAccordion = () => {
    if (props.onToggle) {
      props.onToggle()
      return
    }
    props.setExpanded?.(isOpen ? false : props.index)
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
        'group data-[active=true]:border-(--primary-color)/40 data-[active=true]:shadow-[0_12px_30px_rgba(0,122,184,0.12)] dark:data-[active=true]:border-(--primary-light)/50',
        props.className
      )}
      data-active={isOpen}
    >
      {!!header && (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between gap-2.5 border-none bg-transparent p-3.5 text-inherit transition-all duration-300 outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-(--primary-color) sm:gap-4 sm:p-5"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headerId}
        >
          <div className="min-w-0 flex-1 text-left">{header}</div>
          <span
            className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border border-slate-200/80 bg-slate-100/80 text-slate-500 transition-all duration-300 group-hover:border-(--primary-color)/30 group-hover:bg-(--primary-color)/10 group-hover:text-(--primary-color) group-data-[active=true]:border-transparent group-data-[active=true]:bg-(--primary-color) group-data-[active=true]:text-white sm:size-9 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-400 dark:group-hover:border-(--primary-light)/40 dark:group-hover:bg-(--primary-light)/15 dark:group-hover:text-(--primary-light) dark:group-data-[active=true]:bg-(--primary-light) dark:group-data-[active=true]:text-slate-950"
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
            'grid transition-[grid-template-rows] duration-300 ease-in-out',
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
