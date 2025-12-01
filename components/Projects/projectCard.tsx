import { Card, CardActionArea, CardContent } from '@mui/material'
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
        elevation={3}
        className="m-2 flex-1 min-w-[320px]"
      >
        <CardActionArea className="h-full" onClick={handleOpen}>
          <CardContent className="h-full">
            <h3 className="mb-2">{project.title}</h3>
            {project.tools.map((tool) => {
              return <ToolChip key={tool.title} tool={tool} />
            })}
          </CardContent>
        </CardActionArea>
      </Card>

      <ProjectModal project={project} open={open} handleClose={handleClose} />
    </>
  )
}

export default ProjectCard
