import Link from 'next/link'
import { FaArrowRight, FaClockRotateLeft, FaFileLines } from 'react-icons/fa6'
import { PageSection, SectionHeading } from '@/components/shared/page-section'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'
import type { Role } from '@/types/role'

interface ExperienceProps {
  initialRoles?: Role[]
}

const experienceActionPillClass =
  'group inline-flex items-center gap-3 rounded-full border border-border/90 bg-linear-to-br from-white to-slate-50/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none motion-reduce:hover:translate-y-0 sm:text-base dark:border-border/60 dark:from-slate-900/70 dark:to-slate-950/90'

const Experience = ({ initialRoles }: ExperienceProps) => {
  return (
    <PageSection id="experience">
      <SectionHeading className="mb-2">Experience</SectionHeading>
      <WorkTimeline roles={initialRoles} />
      <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
        <Link className={experienceActionPillClass} href="/extended">
          <FaClockRotateLeft
            className="text-sm text-brand transition-transform duration-300 group-hover:-rotate-12 motion-reduce:group-hover:rotate-0 sm:text-base"
            aria-hidden="true"
          />
          <span>Extended Job History</span>
          <FaArrowRight
            className="text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand motion-reduce:group-hover:translate-x-0 sm:text-sm"
            aria-hidden="true"
          />
        </Link>
        <Link className={experienceActionPillClass} href="/resume">
          <FaFileLines
            className="text-sm text-brand transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100 sm:text-base"
            aria-hidden="true"
          />
          <span>Printable Resume</span>
          <FaArrowRight
            className="text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand motion-reduce:group-hover:translate-x-0 sm:text-sm"
            aria-hidden="true"
          />
        </Link>
      </div>
    </PageSection>
  )
}

export default Experience
