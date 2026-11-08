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
    <div className={cn('group', props.className)} data-active={isOpen}>
      {!!header && (
        <button
          ref={accordionHeader}
          type="button"
          className="flex justify-between transition-all duration-300 p-4 w-full bg-transparent text-inherit border-none cursor-pointer outline-none focus:rounded-lg focus:brightness-95 dark:focus:brightness-110"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={panelId}
          id={headerId}
        >
          <div className="text-left p-1">{header}</div>
          <FaAngleDown
            className="flex self-center transition-transform duration-300 text-[2em] group-data-[active=true]:rotate-180"
            aria-hidden="true"
          />
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
            <div className="mb-6 mx-8">{body}</div>
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
