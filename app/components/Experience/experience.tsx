'use client'
import { Timeline, timelineItemClasses } from '@mui/lab/'
import { Container } from '@mui/material'
import * as React from 'react'
import RoleItem from './RoleItem/roleItem'
import { roles } from '../../data/experience'

const Experience = () => {
  const [expanded, setExpanded] = React.useState<number | false>(false)
  return (
    <section id="experience" className="section">
      <Container>
        <h2>Experience</h2>
        <Timeline
          position="right"
          style={{ padding: 0 }}
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
      </Container>
    </section>
  )
}

export default Experience
