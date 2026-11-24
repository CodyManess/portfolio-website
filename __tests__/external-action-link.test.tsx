import { render, screen } from '@testing-library/react'
import ExternalActionLink from '@/components/shared/external-action-link'

describe('ExternalActionLink', () => {
  it('renders a secure external link with accessible new-tab label', () => {
    render(
      <ExternalActionLink href="https://example.com">
        Visit Project
      </ExternalActionLink>
    )

    const link = screen.getByRole('link', {
      name: 'Visit Project (opens in new tab)',
    })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
