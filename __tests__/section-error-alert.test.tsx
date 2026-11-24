import { fireEvent, render, screen } from '@testing-library/react'
import SectionErrorAlert from '@/components/shared/section-error-alert'

describe('SectionErrorAlert', () => {
  it('renders alert message and invokes onRetry when Retry is clicked', () => {
    const handleRetry = jest.fn()
    render(
      <SectionErrorAlert
        message="Failed to load project data."
        onRetry={handleRetry}
      />
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Failed to load project data.')
    expect(alert).toHaveClass('text-destructive')

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(handleRetry).toHaveBeenCalledTimes(1)
  })

  it('supports inverted styling for brand-colored sections', () => {
    render(
      <SectionErrorAlert
        message="Failed to load education data."
        onRetry={jest.fn()}
        tone="inverted"
      />
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('text-white')

    const retryButton = screen.getByRole('button', { name: 'Retry' })
    expect(retryButton).toHaveClass(
      'dark:border-white/30',
      'dark:bg-white/10',
      'dark:hover:bg-white/20'
    )
    expect(retryButton).not.toHaveClass('dark:border-input')
  })
})
