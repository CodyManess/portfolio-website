'use client'
import projects from '@/shared/data/projects'
import * as React from 'react'
import ProjectCard from './projectCard'

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-4 lg:px-6">
        <h2>Projects</h2>
        <div className="flex flex-row flex-wrap my-4 -mx-2">
          {projects.map((project) => {
            return <ProjectCard key={project.title} {...project} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
