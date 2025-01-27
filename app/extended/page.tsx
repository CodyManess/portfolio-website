'use client'
import RoleItem from '@/shared/components/RoleItem/roleItem'
import styles from './extended.module.css'
import { extendedRoles } from '@/shared/data/experience'
import { Timeline, timelineItemClasses } from '@mui/lab'
import { Container } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cody Maness | Extended Work History',
  description:
    "An extra page within my Portfolio that details past jobs I've worked before and during undergrad.",
}

const Page: React.FC = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false)
  return (
    <section id="extended-experience" className={`section ${styles.extended}`}>
      <Container>
        <Link
          className="h3"
          style={{ display: 'inline-block', marginBottom: '2rem' }}
          href="/#experience"
        >
          <FaArrowLeft
            style={{ verticalAlign: 'bottom', margin: '0 4px 0 2px' }}
          />
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
        <Timeline
          position="right"
          style={{
            padding: 0,
            maxWidth: '65em',
            justifySelf: 'center',
          }}
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {extendedRoles.map((role, index) => (
            <RoleItem
              key={index}
              index={index}
              role={role}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Timeline>
      </Container>
    </section>
  )
}

export default Page
