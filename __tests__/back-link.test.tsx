import { render, screen } from '@testing-library/react'
import BackLink from '@/components/shared/back-link'

describe('BackLink', () => {
  it('renders the default Back to Portfolio label and target href', () => {
    render(<BackLink href="/" />)

    const link = screen.getByRole('link', { name: 'Back to Portfolio' })
    expect(link).toHaveAttribute('href', '/')
  })

  it('supports a custom label and section hash href', () => {
    render(<BackLink href="/#experience" label="Return to Experience" />)

    const link = screen.getByRole('link', { name: 'Return to Experience' })
    expect(link).toHaveAttribute('href', '/#experience')
  })
})
