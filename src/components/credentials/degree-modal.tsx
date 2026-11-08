'use client'
import * as React from 'react'
import { Course, CourseType, Degree } from '@/types/education'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa'
import { cn } from '@/lib/utils'

interface Props {
  degree: Degree
  open: boolean
  handleClose: () => void
}

const CourseItem = ({ course }: { course: Course }) => (
  <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border/70 bg-card hover:border-[var(--primary-color)]/50 hover:bg-muted/30 transition-all duration-200">
    <Badge
      variant="outline"
      className="font-mono text-xs font-semibold px-2 py-0.5 bg-muted/60 text-foreground shrink-0"
    >
      {course.courseNum}
    </Badge>
    <span className="text-sm font-medium text-foreground leading-snug line-clamp-2">
      {course.title}
    </span>
  </div>
)

const DegreeModal = ({ degree, open, handleClose }: Props) => {
  const { schoolName, title, subtitle, schoolLink, awards, courses } = degree
  const [activeTab, setActiveTab] = React.useState<string>('ALL')

  const handleModalClose = () => {
    setActiveTab('ALL')
    handleClose()
  }

  const availableCategories = React.useMemo(() => {
    return Object.values(CourseType).filter((type) =>
      courses.some((course) => course.courseType === type)
    )
  }, [courses])

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-6 gap-0 overflow-hidden">
        {/* Header Section */}
        <DialogHeader className="pr-8 space-y-1 text-left">
          {schoolName && (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {schoolName}
            </p>
          )}
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            {title}
          </DialogTitle>
          {subtitle && (
            <DialogDescription className="text-sm text-muted-foreground mt-0.5">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Accolades & Program Link Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-4 border-b border-border">
          {awards && awards.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Honors:
              </span>
              {awards.map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20"
                >
                  <FaAward className="size-3 text-amber-500 shrink-0" />
                  {award}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          {schoolLink && (
            <Link
              href={schoolLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'text-xs font-medium hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] transition-colors focus-visible:outline-none'
              )}
            >
              Program Website <FaExternalLinkAlt className="ml-1.5 size-3" />
            </Link>
          )}
        </div>

        {/* Modal Body - Tabbed Curriculum Grid */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-5">
          {courses.length > 0 ? (
            <>
              {/* Category Filter Tabs */}
              {availableCategories.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-muted/50 rounded-lg w-fit border border-border/50">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ALL')}
                    className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
                      activeTab === 'ALL'
                        ? 'bg-background text-foreground shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    All ({courses.length})
                  </button>
                  {availableCategories.map((type) => {
                    const count = courses.filter(
                      (c) => c.courseType === type
                    ).length
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveTab(type)}
                        className={cn(
                          'px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer',
                          activeTab === type
                            ? 'bg-background text-foreground shadow-xs font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {type} ({count})
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Course Display: Grouped when 'ALL', or filtered single category */}
              {activeTab === 'ALL' ? (
                <div className="space-y-6">
                  {availableCategories.map((type) => {
                    const filtered = courses.filter(
                      (c) => c.courseType === type
                    )
                    if (filtered.length === 0) return null
                    return (
                      <div key={type} className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                          <span>{type}</span>
                          <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50">
                            {filtered.length}
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {filtered.map((course) => (
                            <CourseItem
                              key={`${course.courseNum}-${course.title}`}
                              course={course}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {courses
                    .filter((course) => course.courseType === activeTab)
                    .map((course) => (
                      <CourseItem
                        key={`${course.courseNum}-${course.title}`}
                        course={course}
                      />
                    ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground py-4">
              No coursework details available.
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <span className="text-xs text-muted-foreground">
            {courses.length} Total Course{courses.length === 1 ? '' : 's'}
          </span>
          <Button
            variant="ghost"
            onClick={handleModalClose}
            className="uppercase text-[var(--primary-color)] hover:text-[var(--primary-dark)] hover:bg-transparent font-semibold tracking-wider text-xs"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DegreeModal
