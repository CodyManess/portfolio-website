import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'

function TestAccordion() {
  const [expanded, setExpanded] = useState<number | false>(false)
  return (
    <Accordion index={0} expanded={expanded} setExpanded={setExpanded}>
      <AccordionHeader>
        <span>Section Title</span>
      </AccordionHeader>
      <AccordionBody>
        <p>Section Body</p>
      </AccordionBody>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('toggles expanded state and preserves button focus on collapse', () => {
    render(<TestAccordion />)

    const toggleButton = screen.getByRole('button', { name: /section title/i })
    toggleButton.focus()
    expect(toggleButton).toHaveFocus()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(toggleButton).toHaveFocus()

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveFocus()
  })
})
