import { Container } from '@mui/material'
import * as React from 'react'
import { roles } from '../../shared/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import WorkTimeline from '@/shared/components/WorkTimeline/WorkTimeline'

const Experience = () => {
  return (
    <section id="experience" className="section">
      <Container>
        <h2>Experience</h2>
        <WorkTimeline roles={roles} />
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
