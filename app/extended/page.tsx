import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Metadata } from 'next'
import { extendedRoles } from '@/shared/data/experience'
import WorkTimeline from '@/shared/components/WorkTimeline/WorkTimeline'

export const metadata: Metadata = {
  title: 'Cody Maness | Extended Work History',
  description:
    "An extra page within my Portfolio that details past jobs I've worked before and during undergrad.",
}

const Page: React.FC = () => {
  return (
    <section id="extended-experience" className="section sm:mt-[12vh]">
      <div className="container mx-auto px-4 lg:px-6">
        <Link className="h3 ml-2 inline-block mb-8" href="/#experience">
          <FaArrowLeft className="inline mx-1" />
          Back to Portfolio
        </Link>
        <h2>Extended Job History</h2>
        <p>
          Here you&apos;ll find the past jobs I do not normally include on my
          professional resume. <br />
          As you can see below, I&apos;ve had a colorful job history working to
          get through high school and college, often working multiple jobs at
          once to make ends meet. <br />
          From this, I hope you can see some of the ambition and hard work that
          helped me get to where I am today.
        </p>
        <WorkTimeline roles={extendedRoles} />
      </div>
    </section>
  )
}

export default Page
