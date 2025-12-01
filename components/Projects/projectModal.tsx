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
      className="[&_.MuiDialog-paper]:max-w-[800px] [&_.MuiDialog-paper]:m-2 [&_.MuiDialog-paper]:p-4"
    >
      <DialogTitle id="scroll-dialog-title">
        {project.title} Details
        <hr />
      </DialogTitle>
      <DialogContent>
        {project.link && (
          <Link
            href={project.link}
            className="block text-[var(--primary-color)] mb-4"
          >
            Public Link <FaExternalLinkAlt fontSize="small" />
          </Link>
        )}
        <h3 className="mb-2">Description</h3>
        <p className="mb-5">{project.description}</p>
        {project.achievements.length !== 0 && (
          <>
            <h3 className="mb-2">Achievements</h3>
            <ul className="mb-5">
              {project.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </>
        )}
        <h3 className="mb-2">Tools Used</h3>
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
