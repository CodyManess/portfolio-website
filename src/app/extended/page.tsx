import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Link from 'next/link'
import type { Metadata } from 'next'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'
import { siteConfig } from '@/config/site'
import { extendedRoles } from '@/data/experience'

export const metadata: Metadata = {
  title: siteConfig.extendedTitle,
  description: siteConfig.extendedDescription,
  alternates: {
    canonical: '/extended',
  },
  openGraph: {
    title: siteConfig.extendedTitle,
    description: siteConfig.extendedDescription,
    siteName: siteConfig.title,
    locale: 'en_US',
    type: 'website',
    url: `${siteConfig.url}/extended`,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `Profile of ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.extendedTitle,
    description: siteConfig.extendedDescription,
    images: [siteConfig.ogImagePath],
  },
}

const Page: React.FC = () => {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section id="extended-experience" className="py-8 sm:mt-[12vh] sm:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <Link
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/70 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-(--primary-color)/40 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none sm:text-base dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-(--primary-light)/40 dark:focus-visible:ring-(--primary-light)"
            href="/#experience"
          >
            <FaArrowLeft
              className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Back to Portfolio</span>
          </Link>
          <h1 className="mb-3 text-4xl/tight font-light sm:text-[3.25rem]">
            Extended Job History
          </h1>
          <p className="mb-4 max-w-3xl text-sm/relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Here you&apos;ll find the past jobs I do not normally include on my
            professional resume. As you can see below, I&apos;ve had a colorful
            job history while getting through high school and college, often
            balancing multiple jobs at once to make ends meet. From this, I hope
            you can see some of the ambition and hard work that helped me get to
            where I am today.
          </p>
          <h2 className="sr-only">Past Roles</h2>
          <WorkTimeline roles={extendedRoles} variant="extended" />
        </div>
      </section>
    </main>
  )
}

export default Page
