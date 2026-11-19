import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@/components/shared/accordion'

function ControlledAccordion() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Accordion isOpen={isOpen} onToggle={() => setIsOpen((prev) => !prev)}>
      <AccordionHeader>
        <span>Controlled Section</span>
      </AccordionHeader>
      <AccordionBody>
        <p>Controlled Body</p>
      </AccordionBody>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('toggles controlled isOpen state, updates panel inert state, and preserves button focus on collapse', () => {
    render(<ControlledAccordion />)

    const toggleButton = screen.getByRole('button', {
      name: /controlled section/i,
    })
    const panel = screen.getByRole('region', {
      name: /controlled section/i,
    })

    toggleButton.focus()
    expect(toggleButton).toHaveFocus()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(panel).toHaveAttribute('inert')

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    expect(panel).not.toHaveAttribute('inert')
    expect(toggleButton).toHaveFocus()

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(panel).toHaveAttribute('inert')
    expect(toggleButton).toHaveFocus()
  })
})
