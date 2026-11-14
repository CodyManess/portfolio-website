import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import PortfolioAppBar from '@/components/nav/app-bar'
import { navLinks } from '@/data/links'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('PortfolioAppBar', () => {
  const originalMatchMedia = Object.getOwnPropertyDescriptor(
    window,
    'matchMedia'
  )
  const originalRAF = Object.getOwnPropertyDescriptor(
    window,
    'requestAnimationFrame'
  )
  const originalCancelRAF = Object.getOwnPropertyDescriptor(
    window,
    'cancelAnimationFrame'
  )

  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'requestAnimationFrame', {
      value: jest.fn((cb: FrameRequestCallback) => {
        cb(0)
        return 1
      }),
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'cancelAnimationFrame', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    const restoreProperty = (
      key: string,
      descriptor: PropertyDescriptor | undefined
    ) => {
      if (descriptor) {
        Object.defineProperty(window, key, descriptor)
      } else {
        Reflect.deleteProperty(window, key)
      }
    }

    restoreProperty('matchMedia', originalMatchMedia)
    restoreProperty('requestAnimationFrame', originalRAF)
    restoreProperty('cancelAnimationFrame', originalCancelRAF)
  })

  it('renders navigation links, hides on scroll down, shows on scroll up, and reveals on focus', () => {
    render(<PortfolioAppBar />)

    const nav = screen.getByRole('navigation', { name: /main/i })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    navLinks.forEach((link) => {
      expect(screen.getByRole('link', { name: link.title })).toBeInTheDocument()
    })

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 200,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'true')

    // Focusing a link inside the hidden navbar reveals it for keyboard users
    fireEvent.focus(screen.getByRole('link', { name: 'Home' }))
    expect(nav).toHaveAttribute('data-hidden', 'false')

    // Scroll down again then scroll up
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 300,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'true')

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 100,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'false')
  })
})
