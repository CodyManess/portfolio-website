import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/footer'
import { socialLinks } from '@/data/links'

describe('Footer', () => {
  it('renders footer landmark, heading, and social contact links', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /thank you for visiting/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      socialLinks.GitHub
    )
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      socialLinks.LinkedIn
    )
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      socialLinks.Email
    )
    expect(screen.getByText(/built by cody maness/i)).toBeInTheDocument()
    expect(
      screen.getByText(/copyright © \d{4} cody maness/i)
    ).toBeInTheDocument()
  })
})
