'use client'
import { Timeline } from '@mui/lab/'
import { Container, Typography } from '@mui/material'
import * as React from 'react'
import RoleItem from './roleItem'
import { roles } from '../../data/experience'

const Experience = () => {
  return (
    <section
      id="experience"
      className="section"
      style={{
        position: 'relative',
        zIndex: 2,
        boxShadow: '0px -12px 20px black',
      }}
    >
      <Container>
        <Typography variant="h2">Experience</Typography>

        <Timeline position="right" style={{ padding: 0 }}>
          {roles.map((role, index) => (
            <RoleItem key={index} {...role} />
          ))}
        </Timeline>
      </Container>
    </section>
  )
}

export default Experience
