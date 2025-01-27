'use client'
import { Timeline, timelineItemClasses } from '@mui/lab/'
import { Container } from '@mui/material'
import * as React from 'react'
import RoleItem from '@/shared/components/RoleItem/roleItem'
import { roles } from '../../shared/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const Experience = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false)
  return (
    <section id="experience" className="section">
      <Container>
        <h2>Experience</h2>
        <Timeline
          position="right"
          style={{ padding: 0, maxWidth: '60em', justifySelf: 'center' }}
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {roles.map((role, index) => (
            <RoleItem
              key={index}
              index={index}
              role={role}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Timeline>
        <Link
          className="h3"
          style={{ display: 'block', marginTop: '2rem' }}
          href="/extended"
        >
          Extended Job History
          <FaArrowRight
            style={{ verticalAlign: 'bottom', margin: '0 0 2px 4px' }}
          />
        </Link>
      </Container>
    </section>
  )
}

export default Experience
