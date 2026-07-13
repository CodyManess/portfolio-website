import React, { useRef, useState, useEffect } from 'react'
import { FaAngleDown } from 'react-icons/fa'

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
  const accordionBody = useRef<HTMLDivElement>(null)
  const accordionHeader = useRef<HTMLButtonElement>(null)
  const [height, setHeight] = useState<string | number>('0px')

  useEffect(() => {
    const element = accordionBody.current
    if (props.expanded === props.index && element) {
      setHeight(element.scrollHeight)
    } else {
      setHeight('0px')
    }
  }, [props.expanded, props.index])

  let header
  let body

  const toggleAccordion = () => {
    if (props.expanded === props.index) {
      accordionHeader.current?.blur()
    }
    props.setExpanded(props.expanded === props.index ? false : props.index)
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
      className={`group ${props.className}`}
      data-active={props.expanded === props.index}
    >
      {!!header && (
        <button
          ref={accordionHeader}
          className="flex justify-between transition-all duration-300 p-4 w-full bg-transparent text-inherit border-none cursor-pointer outline-none focus:rounded-lg focus:brightness-95 dark:focus:brightness-110"
          onClick={toggleAccordion}
          aria-expanded={props.expanded === props.index}
          aria-controls={`accordionpanel${props.index}`}
          id={`accordion${props.index}`}
        >
          <div className="text-left p-1">{header}</div>
          <FaAngleDown className="flex self-center transition-transform duration-300 text-[2em] group-data-[active=true]:rotate-180" />
        </button>
      )}

      {!!body && (
        <div
          ref={accordionBody}
          className="relative overflow-hidden transition-[height] duration-300 ease-in-out"
          id={`accordionpanel${props.index}`}
          role="region"
          aria-labelledby={`accordion${props.index}`}
          style={{ height }}
        >
          <div className="flex-1 mb-6 mx-8 overflow-hidden z-[2]">{body}</div>
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
