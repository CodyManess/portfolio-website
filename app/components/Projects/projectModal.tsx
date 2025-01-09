import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Slide,
  Typography,
} from '@mui/material'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Project from '@/app/models/project'
import ToolChip from '@/app/components/Shared/toolChip'

interface Props {
  project: Project
  open: boolean
  handleClose: () => void
}

const ProjectModal = ({ project, open, handleClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={Slide}
      closeAfterTransition={false}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: 800,
          margin: '8px',
          padding: '1em',
        },
      }}
    >
      <DialogTitle id="scroll-dialog-title">
        {project.title} Details
        <hr />
      </DialogTitle>
      <DialogContent>
        {project.link && (
          <Link
            href={project.link}
            style={{
              display: 'block',
              color: 'var(--primary-color)',
              marginBottom: '1em',
            }}
          >
            Public Link <FaExternalLinkAlt fontSize="small" />
          </Link>
        )}
        <Typography variant="h5" component="h3" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '1em' }}>
          {project.description}
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          Tools Used
        </Typography>
        {project.tools.map((tool) => (
          <ToolChip key={tool.title} tool={tool} />
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
