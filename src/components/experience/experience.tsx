import { roles } from '@/data/experience'
import Link from 'next/link'
import { FaArrowRight, FaClockRotateLeft } from 'react-icons/fa6'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-20 flex justify-center">
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="mb-2">Experience</h2>
        <WorkTimeline roles={roles} />
        <div className="mt-6 flex justify-center">
          <Link
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-slate-200/90 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-900/70 dark:to-slate-950/90 text-sm sm:text-base font-semibold text-[var(--foreground)] hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-light)] shadow-sm hover:shadow-[0_10px_25px_rgba(0,122,184,0.14)] hover:border-[var(--primary-color)]/40 dark:hover:border-[var(--primary-light)]/40 hover:-translate-y-0.5 transition-all duration-300"
            href="/extended"
          >
            <FaClockRotateLeft
              className="text-[var(--primary-color)] dark:text-[var(--primary-light)] text-sm sm:text-base transition-transform duration-300 group-hover:-rotate-12"
              aria-hidden="true"
            />
            <span>Extended Job History</span>
            <FaArrowRight
              className="text-xs sm:text-sm text-slate-400 group-hover:text-[var(--primary-color)] dark:group-hover:text-[var(--primary-light)] transition-all duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Experience
