import type { Metadata } from 'next'
import BackLink from '@/components/shared/back-link'
import { SectionHeading } from '@/components/shared/page-section'
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

const Page = () => {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <section id="extended-experience" className="py-8 sm:mt-24 sm:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <BackLink href="/#experience" className="mb-6" />
          <SectionHeading as="h1" className="mb-3">
            Extended Job History
          </SectionHeading>
          <p className="mb-4 max-w-3xl text-sm/relaxed text-muted-foreground sm:text-base">
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
