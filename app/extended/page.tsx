import styles from './extended.module.css'
import { Container } from '@mui/material'
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
    <section id="extended-experience" className={`section ${styles.extended}`}>
      <Container>
        <Link
          className="h3 ml-2"
          style={{ display: 'inline-block', marginBottom: '2rem' }}
          href="/#experience"
        >
          <FaArrowLeft style={{ display: 'inline', margin: '0 4px 0 2px' }} />
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
      </Container>
    </section>
  )
}

export default Page
