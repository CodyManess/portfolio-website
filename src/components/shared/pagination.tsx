'use client'
import { FaChevronLeft, FaChevronRight, FaEllipsis } from 'react-icons/fa6'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  startIndex?: number
  endIndex?: number
  /** Plural noun used in the item count summary, e.g. "Showing 1 to 6 of 9 projects" */
  itemLabel?: string
  className?: string
}

const paginationBaseButtonClass =
  'inline-flex cursor-pointer items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-xs text-muted-foreground transition-all duration-200 hover:border-brand/35 hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none'

const paginationNavButtonClass = cn(
  paginationBaseButtonClass,
  'gap-1 px-3 py-2 font-medium disabled:pointer-events-none disabled:opacity-40'
)

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  startIndex,
  endIndex,
  itemLabel = 'items',
  className,
}: PaginationProps) => {
  if (totalPages <= 1) return null

  // Generate pagination items for desktop
  const getPageNumbers = (): Array<number | 'ellipsis'> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 'ellipsis', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        'ellipsis',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    }

    return [
      1,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages,
    ]
  }

  const pages = getPageNumbers()

  return (
    <nav
      aria-label="Pagination Navigation"
      className={cn(
        'mt-12 mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row',
        className
      )}
    >
      {/* Item count summary */}
      {typeof totalItems === 'number' && (
        <p className="order-2 text-center text-xs text-muted-foreground sm:order-1 sm:text-left">
          Showing{' '}
          <span className="font-semibold text-foreground">
            {startIndex !== undefined ? startIndex + 1 : 1}
          </span>{' '}
          to{' '}
          <span className="font-semibold text-foreground">
            {endIndex !== undefined
              ? Math.min(endIndex, totalItems)
              : totalItems}
          </span>{' '}
          of <span className="font-semibold text-foreground">{totalItems}</span>{' '}
          {itemLabel}
        </p>
      )}

      {/* Pagination Controls */}
      <div className="order-1 flex items-center gap-1.5 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={paginationNavButtonClass}
        >
          <FaChevronLeft className="size-3" aria-hidden="true" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Mobile: Compact Page Indicator (visible only on small mobile screens < 640px) */}
        <div className="flex items-center rounded-lg border border-border/50 bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:hidden">
          Page{' '}
          <span className="mx-1 font-semibold text-foreground">
            {currentPage}
          </span>{' '}
          of{' '}
          <span className="ml-1 font-semibold text-foreground">
            {totalPages}
          </span>
        </div>

        {/* Desktop / Tablet: Numbered Buttons (hidden on mobile < 640px) */}
        <div className="hidden items-center gap-1.5 sm:flex">
          {pages.map((item, idx) => {
            if (item === 'ellipsis') {
              return (
                <span
                  key={
                    idx < pages.length / 2 ? 'ellipsis-start' : 'ellipsis-end'
                  }
                  className="flex size-9 items-center justify-center text-muted-foreground"
                  aria-hidden="true"
                >
                  <FaEllipsis className="size-3 opacity-60" />
                </span>
              )
            }

            const pageNum = item
            const isActive = currentPage === pageNum

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
                className={cn(
                  paginationBaseButtonClass,
                  'size-9 font-semibold',
                  isActive &&
                    'border-primary bg-primary text-primary-foreground shadow-brand-glow hover:border-primary hover:text-primary-foreground'
                )}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={paginationNavButtonClass}
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="size-3" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
