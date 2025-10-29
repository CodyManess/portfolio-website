import React, { useRef, useState, useEffect } from 'react'
import styles from './accordion.module.css'
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
      className={`${props.className} ${props.expanded === props.index ? styles.active : ''}`}
    >
      {!!header && (
        <button
          ref={accordionHeader}
          className={styles.accordionHeader}
          onClick={toggleAccordion}
          aria-expanded={props.expanded === props.index}
          aria-controls={`accordionpanel${props.index}`}
          id={`accordion${props.index}`}
        >
          <div className={styles.accordionTitle}>{header}</div>
          <FaAngleDown className={styles.accordionIcon} />
        </button>
      )}

      {!!body && (
        <div
          ref={accordionBody}
          className={`${styles.accordionBody}`}
          id={`accordionpanel${props.index}`}
          role="region"
          aria-labelledby={`accordion${props.index}`}
          style={{ height }}
        >
          <div className={styles.accordionBodyContent}>{body}</div>
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
