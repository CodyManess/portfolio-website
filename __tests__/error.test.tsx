import { fireEvent, render, screen } from '@testing-library/react'
import ErrorPage from '@/app/error'

describe('Route Error Boundary', () => {
  it('logs the error, renders fallback UI, and invokes retry on button click', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const retry = jest.fn()
    const testError = new Error('Boom')

    try {
      render(<ErrorPage error={testError} retry={retry} />)

      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { level: 1, name: /something went wrong/i })
      ).toBeInTheDocument()
      const returnHomeLink = screen.getByRole('link', { name: /return home/i })
      expect(returnHomeLink).toHaveAttribute('href', '/')
      expect(returnHomeLink).toHaveClass('text-foreground')
      expect(consoleSpy).toHaveBeenCalledWith(
        'Unhandled route error:',
        testError
      )

      fireEvent.click(screen.getByRole('button', { name: /try again/i }))
      expect(retry).toHaveBeenCalledTimes(1)
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
