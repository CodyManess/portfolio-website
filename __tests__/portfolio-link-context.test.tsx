import { act, fireEvent, render, screen } from '@testing-library/react'
import {
  PortfolioLinkProvider,
  prefersReducedMotion,
  scrollElementIntoView,
  usePortfolioLinks,
  useTemporaryHighlight,
} from '@/components/shared/portfolio-link-context'

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

function OutsideConsumer() {
  const ctx = usePortfolioLinks()
  return <span data-testid="outside-ctx">{ctx ? 'present' : 'null'}</span>
}

function ProviderHarness({
  onRole,
  onProject,
  onTool,
}: {
  onRole: (id: string) => void
  onProject: (id: string) => void
  onTool: (title: string) => void
}) {
  const ctx = usePortfolioLinks()
  const [highlightedId, triggerHighlight] = useTemporaryHighlight(1000)

  if (!ctx) return null

  return (
    <div>
      <span data-testid="highlight-value">{highlightedId ?? 'none'}</span>
      <button type="button" onClick={() => triggerHighlight('item-42')}>
        Trigger Highlight
      </button>
      <button type="button" onClick={() => ctx.navigateToRole('role-1')}>
        Nav Role 1
      </button>
      <button type="button" onClick={() => ctx.navigateToProject('proj-1')}>
        Nav Project 1
      </button>
      <button type="button" onClick={() => ctx.navigateToTool('React')}>
        Nav Tool React
      </button>
      <button
        type="button"
        onClick={() => {
          const unregister = ctx.registerRoleNavigator(onRole)
          unregister()
        }}
      >
        Register And Unregister Role
      </button>
      <button
        type="button"
        onClick={() => {
          ctx.registerRoleNavigator(onRole)
          ctx.registerProjectNavigator(onProject)
          ctx.registerToolFilterNavigator(onTool)
        }}
      >
        Register All Handlers
      </button>
      <button
        type="button"
        onClick={() => {
          const consumed = [
            ctx.consumePendingRole() ?? 'null',
            ctx.consumePendingProject() ?? 'null',
            ctx.consumePendingTool() ?? 'null',
          ].join(',')
          onTool(`consumed:${consumed}`)
        }}
      >
        Consume Pending
      </button>
    </div>
  )
}

describe('PortfolioLinkContext and scroll utilities', () => {
  const originalMatchMedia = Object.getOwnPropertyDescriptor(
    window,
    'matchMedia'
  )

  afterEach(() => {
    jest.useRealTimers()
    restoreWindowProperty('matchMedia', originalMatchMedia)
  })

  it('detects prefersReducedMotion safely across environments', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
      writable: true,
      configurable: true,
    })
    expect(prefersReducedMotion()).toBe(true)

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
      writable: true,
      configurable: true,
    })
    expect(prefersReducedMotion()).toBe(false)

    Object.defineProperty(window, 'matchMedia', {
      value: undefined,
      writable: true,
      configurable: true,
    })
    expect(prefersReducedMotion()).toBe(false)
  })

  it('scrolls elements into view respecting instant, reduced motion, and null guards', () => {
    const scrollIntoViewMock = jest.fn()
    const el = document.createElement('div')
    el.scrollIntoView = scrollIntoViewMock

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: false })),
      writable: true,
      configurable: true,
    })

    scrollElementIntoView(el)
    expect(scrollIntoViewMock).toHaveBeenLastCalledWith({
      behavior: 'smooth',
      block: 'center',
    })

    scrollElementIntoView(el, { instant: true, block: 'start' })
    expect(scrollIntoViewMock).toHaveBeenLastCalledWith({
      behavior: 'auto',
      block: 'start',
    })

    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => ({ matches: true })),
      writable: true,
      configurable: true,
    })

    scrollElementIntoView(el)
    expect(scrollIntoViewMock).toHaveBeenLastCalledWith({
      behavior: 'auto',
      block: 'center',
    })

    expect(() => scrollElementIntoView(null)).not.toThrow()
    const noScrollEl = document.createElement('div')
    Reflect.set(noScrollEl, 'scrollIntoView', undefined)
    expect(() => scrollElementIntoView(noScrollEl)).not.toThrow()
  })

  it('returns null outside provider and queues, dispatches, and cleans up navigation channels', () => {
    render(<OutsideConsumer />)
    expect(screen.getByTestId('outside-ctx')).toHaveTextContent('null')

    const onRole = jest.fn()
    const onProject = jest.fn()
    const onTool = jest.fn()

    render(
      <PortfolioLinkProvider>
        <ProviderHarness
          onRole={onRole}
          onProject={onProject}
          onTool={onTool}
        />
      </PortfolioLinkProvider>
    )

    // Navigating before handlers register stores pending targets
    fireEvent.click(screen.getByRole('button', { name: 'Nav Role 1' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nav Project 1' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nav Tool React' }))
    expect(onRole).not.toHaveBeenCalled()
    expect(onProject).not.toHaveBeenCalled()
    expect(onTool).not.toHaveBeenCalled()

    // Consuming returns pending targets once and clears them
    fireEvent.click(screen.getByRole('button', { name: 'Consume Pending' }))
    expect(onTool).toHaveBeenLastCalledWith('consumed:role-1,proj-1,React')

    fireEvent.click(screen.getByRole('button', { name: 'Consume Pending' }))
    expect(onTool).toHaveBeenLastCalledWith('consumed:null,null,null')

    // Registering then unregistering restores pending queue behavior
    fireEvent.click(
      screen.getByRole('button', { name: 'Register And Unregister Role' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Nav Role 1' }))
    expect(onRole).not.toHaveBeenCalled()

    // Registering active handlers dispatches directly and clears pending state
    fireEvent.click(
      screen.getByRole('button', { name: 'Register All Handlers' })
    )
    fireEvent.click(screen.getByRole('button', { name: 'Nav Role 1' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nav Project 1' }))
    fireEvent.click(screen.getByRole('button', { name: 'Nav Tool React' }))

    expect(onRole).toHaveBeenCalledWith('role-1')
    expect(onProject).toHaveBeenCalledWith('proj-1')
    expect(onTool).toHaveBeenCalledWith('React')
  })

  it('auto-clears temporary highlight after the configured timeout', () => {
    jest.useFakeTimers()

    render(
      <PortfolioLinkProvider>
        <ProviderHarness
          onRole={jest.fn()}
          onProject={jest.fn()}
          onTool={jest.fn()}
        />
      </PortfolioLinkProvider>
    )

    expect(screen.getByTestId('highlight-value')).toHaveTextContent('none')
    fireEvent.click(screen.getByRole('button', { name: 'Trigger Highlight' }))
    expect(screen.getByTestId('highlight-value')).toHaveTextContent('item-42')

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('highlight-value')).toHaveTextContent('none')
  })
})
