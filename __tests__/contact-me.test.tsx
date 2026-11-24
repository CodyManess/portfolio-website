import { render, screen } from '@testing-library/react'
import ContactMe from '@/components/shared/contact-me'
import { socialLinks } from '@/data/links'

describe('ContactMe', () => {
  it('renders GitHub, LinkedIn, and Email links on adaptive surface and preserves platform hover colors', () => {
    render(<ContactMe surface="adaptive" />)

    const github = screen.getByRole('link', { name: /github/i })
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    const email = screen.getByRole('link', { name: /email/i })

    expect(github).toHaveAttribute('href', socialLinks.GitHub)
    expect(linkedin).toHaveAttribute('href', socialLinks.LinkedIn)
    expect(email).toHaveAttribute('href', socialLinks.Email)

    expect(linkedin).toHaveClass('hover:bg-[#0a66c2]', 'hover:border-[#0a66c2]')
    expect(email).toHaveClass('hover:bg-[#ea4335]', 'hover:border-[#ea4335]')
    expect(github).toHaveClass('hover:bg-slate-200/90')
  })

  it('preserves platform hover accents on dark surface', () => {
    render(<ContactMe surface="dark" />)

    const github = screen.getByRole('link', { name: /github/i })
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    const email = screen.getByRole('link', { name: /email/i })

    expect(github).toHaveClass('text-white', 'hover:bg-white/20')
    expect(linkedin).toHaveClass('hover:bg-[#0a66c2]', 'hover:border-[#0a66c2]')
    expect(email).toHaveClass('hover:bg-[#ea4335]', 'hover:border-[#ea4335]')
  })
})
