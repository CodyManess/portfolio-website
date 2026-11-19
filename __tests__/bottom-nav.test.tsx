import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import BottomNav from '@/components/layout/bottom-nav'
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

describe('BottomNav', () => {
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
  const originalInnerHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
  )

  beforeEach(() => {
    mockedUsePathname.mockReturnValue('/')
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
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
    restoreWindowProperty('innerHeight', originalInnerHeight)
  })

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

  it('highlights Experience when on the /extended route', () => {
    mockedUsePathname.mockReturnValue('/extended')
    render(<BottomNav />)

    expect(screen.getByRole('link', { name: /experience/i })).toHaveAttribute(
      'aria-current',
      'location'
    )
    expect(screen.getByRole('link', { name: /home/i })).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('updates active link on scroll and responds to viewport media changes', () => {
    let matches = true
    let changeHandler: (() => void) | undefined

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockImplementation((query: string) => ({
        get matches() {
          return matches
        },
        media: query,
        addEventListener: jest.fn((_event: string, cb: () => void) => {
          changeHandler = cb
        }),
        removeEventListener: jest.fn(),
      })),
      writable: true,
      configurable: true,
    })

    const homeSection = document.createElement('section')
    homeSection.id = 'home'
    homeSection.getBoundingClientRect = () => ({ top: -400 }) as DOMRect

    const projectsSection = document.createElement('section')
    projectsSection.id = 'projects'
    projectsSection.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

    document.body.append(homeSection, projectsSection)

    try {
      const { unmount } = render(<BottomNav />)

      expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute(
        'aria-current',
        'location'
      )

      // Update section position and fire scroll + hashchange
      projectsSection.getBoundingClientRect = () => ({ top: 900 }) as DOMRect
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
        'aria-current',
        'location'
      )

      // Toggle from mobile to desktop and back to mobile
      act(() => {
        matches = false
        changeHandler?.()
      })
      act(() => {
        matches = true
        changeHandler?.()
      })

      unmount()
    } finally {
      homeSection.remove()
      projectsSection.remove()
    }
  })
})
