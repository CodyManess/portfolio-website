import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import BottomNav from '@/components/nav/bottom-nav'
import { navLinks } from '@/data/links'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('BottomNav', () => {
  it('renders all mobile navigation links and updates active state on click', () => {
    render(<BottomNav />)

    const nav = screen.getByRole('navigation', { name: /mobile/i })
    expect(nav).toBeInTheDocument()

    navLinks.forEach((link) => {
      expect(
        screen.getByRole('link', { name: new RegExp(link.title, 'i') })
      ).toBeInTheDocument()
    })

    const experienceLink = screen.getByRole('link', { name: /experience/i })
    fireEvent.click(experienceLink)
    expect(experienceLink).toHaveAttribute('aria-current', 'location')
  })
})
