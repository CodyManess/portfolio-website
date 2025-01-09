'use client'
import projects from '@/app/data/projects'
import { Container, Stack, Typography } from '@mui/material'
import * as React from 'react'
import ProjectCard from './projectCard'

const Projects = () => {
  return (
    <section id="projects" className="section">
      <Container>
        <Typography variant="h2">Projects</Typography>
        <Stack direction="row" sx={{ margin: '1em 0', flexWrap: 'wrap' }}>
          {projects.map((project) => {
            return <ProjectCard key={project.title} {...project} />
          })}
        </Stack>
      </Container>
    </section>
  )
}

export default Projects
