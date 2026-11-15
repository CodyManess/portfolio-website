import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

describe('NotFound Page', () => {
  it('renders 404 heading and home link inside a main landmark', () => {
    render(<NotFound />)

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 1, name: /page not found/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute(
      'href',
      '/'
    )
  })
})
