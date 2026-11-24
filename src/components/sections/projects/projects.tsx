import type { Project } from '@/types/project'
import { PageSection, SectionHeading } from '@/components/shared/page-section'
import ProjectList from './project-list'

interface ProjectsProps {
  initialProjects?: Project[]
}

const Projects = ({ initialProjects }: ProjectsProps) => {
  return (
    <PageSection id="projects">
      <SectionHeading className="mb-6 sm:mb-8">Projects</SectionHeading>
      <ProjectList initialProjects={initialProjects} />
    </PageSection>
  )
}

export default Projects
