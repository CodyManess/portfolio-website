import { fireEvent, render, screen } from '@testing-library/react'
import GlobalError from '@/app/global-error'

describe('Global Error Boundary', () => {
  it('logs the error and calls retry when Try again is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const retry = jest.fn()
    const testError = new Error('Critical failure')

    try {
      render(<GlobalError error={testError} retry={retry} />, {
        container: document.documentElement,
      })

      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 1, name: /something went wrong/i })
      ).toBeInTheDocument()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Unhandled global error:',
        testError
      )

      fireEvent.click(screen.getByRole('button', { name: /try again/i }))
      expect(retry).toHaveBeenCalledTimes(1)
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
