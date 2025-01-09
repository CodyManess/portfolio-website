import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import Project from '@/app/models/project'
import ProjectModal from './projectModal'
import ToolChip from '@/app/components/Shared/toolChip'

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
            <Typography gutterBottom variant="h5" component="h3">
              {project.title}
            </Typography>
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
