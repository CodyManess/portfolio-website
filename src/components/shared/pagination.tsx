'use client'
import * as React from 'react'
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
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-(--primary-color)/30 hover:text-(--primary-color) focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800/40 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-(--primary-light)/40 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light)"
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
                  'flex size-9 cursor-pointer items-center justify-center rounded-xl border text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:focus-visible:ring-(--primary-light)',
                  isActive
                    ? 'border-(--primary-color) bg-(--primary-color) text-white shadow-[0_0_12px_rgba(0,122,184,0.3)]'
                    : 'border-slate-200/80 bg-slate-50/60 text-slate-600 hover:border-(--primary-color)/30 hover:text-(--primary-color) dark:border-slate-800/40 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-(--primary-light)/40 dark:hover:text-(--primary-light)'
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
          className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200/80 bg-slate-50/60 px-3 py-2 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-(--primary-color)/30 hover:text-(--primary-color) focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 dark:border-slate-800/40 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-(--primary-light)/40 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light)"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="size-3" aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
