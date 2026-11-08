import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Metadata } from 'next'
import { extendedRoles } from '@/data/experience'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'

export const metadata: Metadata = {
  title: 'Cody Maness | Extended Work History',
  description:
    'An extra page within my portfolio detailing past jobs worked before and during college.',
  alternates: {
    canonical: '/extended',
  },
  openGraph: {
    title: 'Cody Maness | Extended Work History',
    description:
      'An extra page within my portfolio detailing past jobs worked before and during college.',
    url: 'https://codymaness.com/extended',
  },
}

const Page: React.FC = () => {
  return (
    <section
      id="extended-experience"
      className="section sm:mt-[12vh] py-8 sm:py-12"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <Link
          className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold px-4 py-2 rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-900/70 hover:border-[var(--primary-color)]/40 dark:hover:border-[var(--primary-light)]/40 mb-6 transition-all duration-200"
          href="/#experience"
        >
          <FaArrowLeft
            className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span>Back to Portfolio</span>
        </Link>
        <h1 className="text-4xl sm:text-[3.25rem] font-light leading-tight mb-3">
          Extended Job History
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          Here you&apos;ll find the past jobs I do not normally include on my
          professional resume. As you can see below, I&apos;ve had a colorful
          job history while getting through high school and college, often
          balancing multiple jobs at once to make ends meet. From this, I hope
          you can see some of the ambition and hard work that helped me get to
          where I am today.
        </p>
        <WorkTimeline roles={extendedRoles} />
      </div>
    </section>
  )
}

export default Page
