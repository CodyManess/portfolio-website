'use client'
import { useMemo, useState } from 'react'
import type { Course, Degree } from '@/types/education'
import { CourseType } from '@/types/education'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import ExternalActionLink from '@/components/shared/external-action-link'
import { Overline } from '@/components/shared/page-section'
import { FaAward } from 'react-icons/fa6'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface Props {
  degree: Degree
  open: boolean
  handleClose: () => void
}

const getTabButtonClass = (isActive: boolean) =>
  cn(
    'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
    isActive
      ? 'bg-background font-semibold text-foreground shadow-xs'
      : 'text-muted-foreground hover:text-foreground'
  )

const CourseItem = ({ course }: { course: Course }) => (
  <div className="flex items-center gap-2.5 rounded-lg border border-border/70 bg-card p-2.5 transition-all duration-200 hover:border-brand/50 hover:bg-muted/30">
    <Badge
      variant="subtle"
      className="shrink-0 font-mono font-semibold text-foreground"
    >
      {course.courseNum}
    </Badge>
    <span className="line-clamp-2 text-sm/snug font-medium text-foreground">
      {course.title}
    </span>
  </div>
)

const DegreeModal = ({ degree, open, handleClose }: Props) => {
  const { schoolName, title, subtitle, date, schoolLink, awards, courses } =
    degree
  const [activeTab, setActiveTab] = useState<CourseType | 'ALL'>('ALL')
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

  const { availableCategories, coursesByCategory } = useMemo(() => {
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
          {schoolName || date ? (
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {schoolName ? <span>{schoolName}</span> : null}
              {schoolName && date ? <span aria-hidden="true">·</span> : null}
              {date ? <span className="font-mono">{date}</span> : null}
            </div>
          ) : null}
          <DialogTitle>{title}</DialogTitle>
          {subtitle ? (
            <DialogDescription className="mt-0.5">{subtitle}</DialogDescription>
          ) : null}
        </DialogHeader>

        {/* Accolades & Program Link Action Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pt-3 pb-4">
          {awards.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <Overline as="span" className="mr-1">
                Honors:
              </Overline>
              {awards.map((award) => (
                <Badge
                  key={award}
                  variant="highlight"
                  size="md"
                  className="gap-1.5"
                >
                  <FaAward
                    className="text-amber-600 dark:text-amber-400"
                    aria-hidden="true"
                  />
                  <span>{award}</span>
                </Badge>
              ))}
            </div>
          ) : (
            <div />
          )}

          {safeSchoolLink ? (
            <ExternalActionLink href={safeSchoolLink}>
              Program Website
            </ExternalActionLink>
          ) : null}
        </div>

        {/* Modal Body - Tabbed Curriculum Grid */}
        <DialogBody className="space-y-5">
          {courses.length > 0 ? (
            <>
              {/* Category Filter Tabs */}
              {availableCategories.length > 1 && (
                <div
                  // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Toolbar of toggle buttons is not a form <fieldset>
                  role="group"
                  aria-label="Filter coursework by category"
                  className="flex w-fit flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-muted/50 p-1"
                >
                  <button
                    type="button"
                    aria-pressed={activeTab === 'ALL'}
                    onClick={() => setActiveTab('ALL')}
                    className={getTabButtonClass(activeTab === 'ALL')}
                  >
                    All ({courses.length})
                  </button>
                  {availableCategories.map((type) => {
                    const count = coursesByCategory.get(type)?.length ?? 0
                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={activeTab === type}
                        onClick={() => setActiveTab(type)}
                        className={getTabButtonClass(activeTab === type)}
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
                        <Overline className="flex items-center gap-2">
                          <span>{type}</span>
                          <Badge variant="subtle" className="font-normal">
                            {filtered.length}
                          </Badge>
                        </Overline>
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
        </DialogBody>

        {/* Footer Section */}
        <DialogFooter showCloseButton>
          <span className="text-xs text-muted-foreground">
            {courses.length} Total Course{courses.length === 1 ? '' : 's'}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DegreeModal
