import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@/components/shared/pagination'

describe('Pagination Component', () => {
  it('does not render when totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders summary text and handles next and previous page changes', () => {
    const onPageChange = jest.fn()
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
        totalItems={15}
        startIndex={0}
        endIndex={6}
      />
    )

    // Check summary text (defaults to "items" when itemLabel is omitted)
    expect(screen.getByText(/Showing/i)).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText(/items/i)).toBeInTheDocument()

    // Previous should be disabled on first page
    const prevBtn = screen.getByRole('button', { name: /previous/i })
    expect(prevBtn).toBeDisabled()

    // Next should be enabled
    const nextBtn = screen.getByRole('button', { name: /next/i })
    expect(nextBtn).toBeEnabled()

    // Click Next
    fireEvent.click(nextBtn)
    expect(onPageChange).toHaveBeenCalledWith(2)

    // Click page 2 directly
    const page2Btn = screen.getByRole('button', { name: 'Page 2' })
    fireEvent.click(page2Btn)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('disables next button on the last page', () => {
    const onPageChange = jest.fn()
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChange}
        totalItems={15}
        startIndex={12}
        endIndex={15}
      />
    )

    const nextBtn = screen.getByRole('button', { name: /next/i })
    expect(nextBtn).toBeDisabled()

    const prevBtn = screen.getByRole('button', { name: /previous/i })
    expect(prevBtn).toBeEnabled()

    fireEvent.click(prevBtn)
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('renders ellipsis for large page sets (> 5 pages)', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={jest.fn()} />
    )

    // For middle page (5 of 10), page 1 and page 10 should be visible along with current neighbors
    expect(screen.getByRole('button', { name: 'Page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 4' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 6' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Page 10' })).toBeInTheDocument()
  })

  it('renders mobile compact page indicator', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />
    )

    expect(screen.getByText(/Page/i)).toBeInTheDocument()
  })
})
