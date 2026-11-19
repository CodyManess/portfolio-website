import Link from 'next/link'
import { FaArrowRight, FaClockRotateLeft } from 'react-icons/fa6'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'
import type { Role } from '@/types/role'

interface ExperienceProps {
  initialRoles?: Role[]
}

const Experience = ({ initialRoles }: ExperienceProps) => {
  return (
    <section id="experience" className="flex justify-center py-16 md:py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="mb-2">Experience</h2>
        <WorkTimeline roles={initialRoles} />
        <div className="mt-6 flex justify-center">
          <Link
            className="group inline-flex items-center gap-3 rounded-full border border-slate-200/90 bg-linear-to-br from-white to-slate-50/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-(--primary-color)/40 hover:text-(--primary-color) hover:shadow-[0_10px_25px_rgba(0,122,184,0.14)] focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none sm:text-base dark:border-slate-800/80 dark:from-slate-900/70 dark:to-slate-950/90 dark:hover:border-(--primary-light)/40 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light)"
            href="/extended"
          >
            <FaClockRotateLeft
              className="text-sm text-(--primary-color) transition-transform duration-300 group-hover:-rotate-12 sm:text-base dark:text-(--primary-light)"
              aria-hidden="true"
            />
            <span>Extended Job History</span>
            <FaArrowRight
              className="text-xs text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--primary-color) sm:text-sm dark:group-hover:text-(--primary-light)"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Experience
