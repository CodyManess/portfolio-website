'use client'
import * as React from 'react'
import type { Course, Degree } from '@/types/education'
import { CourseType } from '@/types/education'
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
import { FaAward, FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface Props {
  degree: Degree
  open: boolean
  handleClose: () => void
}

const CourseItem = ({ course }: { course: Course }) => (
  <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card p-2.5 transition-all duration-200 hover:border-(--primary-color)/50 hover:bg-muted/30">
    <Badge
      variant="outline"
      className="shrink-0 bg-muted/60 px-2 py-0.5 font-mono text-xs font-semibold text-foreground"
    >
      {course.courseNum}
    </Badge>
    <span className="line-clamp-2 text-sm/snug font-medium text-foreground">
      {course.title}
    </span>
  </div>
)

const DegreeModal = ({ degree, open, handleClose }: Props) => {
  const { schoolName, title, subtitle, schoolLink, awards, courses } = degree
  const [activeTab, setActiveTab] = React.useState<CourseType | 'ALL'>('ALL')
  const safeSchoolLink = getSafeExternalUrl(schoolLink)

  const handleModalClose = () => {
    setActiveTab('ALL')
    handleClose()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleModalClose()
    }
  }

  const { availableCategories, coursesByCategory } = React.useMemo(() => {
    const grouped = new Map<CourseType, Course[]>()
    for (const course of courses) {
      const list = grouped.get(course.courseType)
      if (list) {
        list.push(course)
      } else {
        grouped.set(course.courseType, [course])
      }
    }
    const categories = Object.values(CourseType).filter((type) =>
      grouped.has(type)
    )
    return { availableCategories: categories, coursesByCategory: grouped }
  }, [courses])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-6 sm:max-w-200">
        {/* Header Section */}
        <DialogHeader className="space-y-1 pr-8 text-left">
          {schoolName ? (
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {schoolName}
            </p>
          ) : null}
          <DialogTitle className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </DialogTitle>
          {subtitle ? (
            <DialogDescription className="mt-0.5 text-sm text-muted-foreground">
              {subtitle}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {/* Accolades & Program Link Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pt-3 pb-4">
          {awards.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Honors:
              </span>
              {awards.map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-300"
                >
                  <FaAward className="size-3 shrink-0 text-amber-500" />
                  {award}
                </span>
              ))}
            </div>
          ) : (
            <div />
          )}

          {safeSchoolLink ? (
            <Link
              href={safeSchoolLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'text-xs font-medium transition-colors hover:border-(--primary-color) hover:text-(--primary-color) focus-visible:outline-none'
              )}
            >
              Program Website{' '}
              <FaArrowUpRightFromSquare className="ml-1.5 size-3" />
            </Link>
          ) : null}
        </div>

        {/* Modal Body - Tabbed Curriculum Grid */}
        <div className="flex-1 space-y-5 overflow-y-auto py-4 pr-1">
          {courses.length > 0 ? (
            <>
              {/* Category Filter Tabs */}
              {availableCategories.length > 1 && (
                <div className="flex w-fit flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-muted/50 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('ALL')}
                    className={cn(
                      'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-all',
                      activeTab === 'ALL'
                        ? 'bg-background font-semibold text-foreground shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    All ({courses.length})
                  </button>
                  {availableCategories.map((type) => {
                    const count = coursesByCategory.get(type)?.length ?? 0
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveTab(type)}
                        className={cn(
                          'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-all',
                          activeTab === type
                            ? 'bg-background font-semibold text-foreground shadow-xs'
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
                    const filtered = coursesByCategory.get(type) ?? []
                    if (filtered.length === 0) return null
                    return (
                      <div key={type} className="space-y-3">
                        <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                          <span>{type}</span>
                          <span className="rounded-full border border-border/50 bg-muted px-2 py-0.5 text-[11px] font-normal text-muted-foreground">
                            {filtered.length}
                          </span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {(coursesByCategory.get(activeTab) ?? []).map((course) => (
                    <CourseItem
                      key={`${course.courseNum}-${course.title}`}
                      course={course}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="py-4 text-sm text-muted-foreground">
              No coursework details available.
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs text-muted-foreground">
            {courses.length} Total Course{courses.length === 1 ? '' : 's'}
          </span>
          <Button
            variant="ghost"
            onClick={handleModalClose}
            className="text-xs font-semibold tracking-wider text-(--primary-color) uppercase hover:bg-transparent hover:text-(--primary-dark)"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DegreeModal
