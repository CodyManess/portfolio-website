'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import * as React from 'react'
import Project from '@/shared/models/project'
import ProjectModal from './projectModal'
import ToolChip from '@/shared/components/toolChip'

/**
 * Props for the ProjectCard component.
 * @param project - The project data object to display.
 */
const ProjectCard = (project: Project) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Card
        className="m-2 flex-1 min-w-[320px] cursor-pointer hover:opacity-90 transition-opacity shadow-md"
        onClick={handleOpen}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold mb-2">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <div className="flex flex-wrap gap-1">
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </div>
        </CardContent>
      </Card>

      <ProjectModal project={project} open={open} handleClose={handleClose} />
    </>
  )
}

export default ProjectCard
