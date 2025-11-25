import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Slide,
} from '@mui/material'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Project from '@/shared/models/project'
import ToolChip from '@/shared/components/toolChip'

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
      slots={{
        transition: Slide,
      }}
      keepMounted
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
        <h3 style={{ marginBottom: '0.5em' }}>Description</h3>
        <p style={{ marginBottom: '1.25em' }}>{project.description}</p>
        {project.achievements.length !== 0 && (
          <>
            <h3 style={{ marginBottom: '0.5em' }}>Achievements</h3>
            <ul style={{ marginBottom: '1.25em' }}>
              {project.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </>
        )}
        <h3 style={{ marginBottom: '0.5em' }}>Tools Used</h3>
        {project.tools.map((tool) => (
          <ToolChip key={tool.title} tool={tool} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectModal
