'use client'
import * as React from 'react'
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from 'react-icons/fa'
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
  const getPageNumbers = () => {
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
        'flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 mb-6',
        className
      )}
    >
      {/* Item count summary */}
      {typeof totalItems === 'number' && (
        <p className="text-xs text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
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
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-xl border border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)] cursor-pointer"
        >
          <FaChevronLeft className="size-3" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Mobile: Compact Page Indicator (visible only on small mobile screens < 640px) */}
        <div className="flex sm:hidden items-center px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted/40 rounded-lg border border-border/50">
          Page{' '}
          <span className="font-semibold text-foreground mx-1">
            {currentPage}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-foreground ml-1">
            {totalPages}
          </span>
        </div>

        {/* Desktop / Tablet: Numbered Buttons (hidden on mobile < 640px) */}
        <div className="hidden sm:flex items-center gap-1.5">
          {pages.map((item, idx) => {
            if (item === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-muted-foreground"
                  aria-hidden="true"
                >
                  <FaEllipsisH className="size-3 opacity-60" />
                </span>
              )
            }

            const pageNum = item as number
            const isActive = currentPage === pageNum

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
                className={cn(
                  'w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer',
                  isActive
                    ? 'bg-[var(--primary-color)] border-[var(--primary-color)] text-white shadow-[0_0_12px_rgba(0,122,184,0.3)]'
                    : 'border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)]'
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
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-xl border border-slate-200/80 dark:border-slate-800/40 bg-slate-50/60 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 hover:border-[var(--primary-color)]/30 hover:text-[var(--primary-color)] dark:hover:border-[var(--primary-light)]/40 dark:hover:text-[var(--primary-light)] cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <FaChevronRight className="size-3" />
        </button>
      </div>
    </nav>
  )
}

export default Pagination
