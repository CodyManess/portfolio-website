import { Dialog, DialogContent, DialogTitle, Link, Slide } from '@mui/material'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Project from '../../shared/models/project'
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
        <h3 style={{ marginBottom: '0.5em' }}>Description</h3>
        <p style={{ marginBottom: '1.25em' }}>{project.description}</p>
        <h3 style={{ marginBottom: '0.5em' }}>Tools Used</h3>
        {project.tools.map((tool) => (
          <ToolChip key={tool.title} tool={tool} />
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
