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
        style={{
          margin: '8px',
          flex: 1,
          minWidth: '320px',
        }}
      >
        <CardActionArea style={{ height: '100%' }} onClick={handleOpen}>
          <CardContent style={{ height: '100%' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
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
