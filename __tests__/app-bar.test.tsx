import { act, fireEvent, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import PortfolioAppBar from '@/components/layout/app-bar'
import { navLinks } from '@/data/links'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

const mockedUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

const restoreWindowProperty = (
  key: string,
  descriptor: PropertyDescriptor | undefined
) => {
  if (descriptor) {
    Object.defineProperty(window, key, descriptor)
  } else {
    Reflect.deleteProperty(window, key)
  }
}

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
    mockedUsePathname.mockReturnValue('/')
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
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
    restoreWindowProperty('matchMedia', originalMatchMedia)
    restoreWindowProperty('requestAnimationFrame', originalRAF)
    restoreWindowProperty('cancelAnimationFrame', originalCancelRAF)
  })

  it('renders a banner landmark, navigation links, ignores small scroll deltas, hides on scroll down, shows on scroll up, and reveals on focus', () => {
    render(<PortfolioAppBar />)

    expect(screen.getByRole('banner')).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: /main/i })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    navLinks.forEach((link) => {
      expect(screen.getByRole('link', { name: link.title })).toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      '/resume'
    )

    // Scrolling within the top offset (<= 64px) keeps the navbar visible
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 50,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    // Small downward scroll (< 10px delta) does not hide the navbar
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 55,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    // Scrolling past offset and delta threshold hides the navbar
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

  it('highlights the active section on scroll, click, and /extended route', () => {
    const homeSection = document.createElement('section')
    homeSection.id = 'home'
    homeSection.getBoundingClientRect = () =>
      ({ top: -300, bottom: -100 }) as DOMRect

    const projectsSection = document.createElement('section')
    projectsSection.id = 'projects'
    projectsSection.getBoundingClientRect = () =>
      ({ top: 100, bottom: 600 }) as DOMRect

    document.body.appendChild(homeSection)
    document.body.appendChild(projectsSection)

    try {
      const { rerender } = render(<PortfolioAppBar />)

      expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
        'aria-current',
        'location'
      )

      fireEvent.click(screen.getByRole('link', { name: 'About' }))
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
        'aria-current',
        'location'
      )

      mockedUsePathname.mockReturnValue('/extended')
      rerender(<PortfolioAppBar />)
      expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute(
        'aria-current',
        'location'
      )

      mockedUsePathname.mockReturnValue('/resume')
      rerender(<PortfolioAppBar />)
      expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute(
        'aria-current',
        'page'
      )
      navLinks.forEach((link) => {
        expect(
          screen.getByRole('link', { name: link.title })
        ).not.toHaveAttribute('aria-current')
      })
    } finally {
      homeSection.remove()
      projectsSection.remove()
    }
  })

  it('detaches scroll listener and resets hidden state when transitioning from desktop to mobile viewport', () => {
    let isDesktop = true
    let changeListener: (() => void) | undefined

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query: string) => ({
        get matches() {
          return isDesktop
        },
        media: query,
        addEventListener: jest.fn((event: string, listener: () => void) => {
          if (event === 'change') {
            changeListener = listener
          }
        }),
        removeEventListener: jest.fn(),
      })),
      writable: true,
      configurable: true,
    })

    render(<PortfolioAppBar />)
    const nav = screen.getByRole('navigation', { name: /main/i })

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 200,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'true')

    // Transition to mobile: resets hidden state and detaches scroll listener
    act(() => {
      isDesktop = false
      changeListener?.()
    })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 400,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'false')

    // Transition back to desktop: re-attaches listener and tracks scroll again
    act(() => {
      isDesktop = true
      changeListener?.()
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 600,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav).toHaveAttribute('data-hidden', 'true')
  })
})
