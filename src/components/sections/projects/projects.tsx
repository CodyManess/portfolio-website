import type { Project } from '@/types/project'
import ProjectList from './project-list'

interface ProjectsProps {
  initialProjects?: Project[]
}

const Projects = ({ initialProjects }: ProjectsProps) => {
  return (
    <section id="projects" className="flex justify-center py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <h2 className="mb-6 sm:mb-8">Projects</h2>
        <ProjectList initialProjects={initialProjects} />
      </div>
    </section>
  )
}

export default Projects
