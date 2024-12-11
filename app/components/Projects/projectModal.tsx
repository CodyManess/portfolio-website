import { Chip, Dialog, DialogContent, DialogTitle, Link, Slide, Typography } from "@mui/material";
import Project from "../../models/project"
import Image from "next/image";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Props {
    project : Project, open: boolean, handleClose: () => void
}

const ProjectModal = ({project, open, handleClose}: Props) => {
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
                    padding: '1em'
                }
            }}
        >
            <DialogTitle id="scroll-dialog-title">{project.title} Details</DialogTitle>
            {
                project.link && <Link 
                    href={project.link} 
                    style={{ 
                        display: 'block',
                        color: 'var(--primary-color)', 
                        marginBottom: '1em'
                }}>
                    Program Link <OpenInNewIcon fontSize="small" />
                </Link>
            }
            <DialogContent>
                <Typography 
                    variant="h5" component="h3"
                    gutterBottom
                >
                    Description
                </Typography>
                <Typography 
                    variant="body1"
                    gutterBottom
                >
                    { project.description }
                </Typography>
                <Typography 
                    variant="h5" component="h3"
                    gutterBottom
                >
                    Tools Used
                </Typography>
                {
                    project.tools.map(tool => {
                        return (
                            <Chip 
                                key={tool.title} 
                                icon={<Image 
                                    src={tool.icon} alt={tool.title}
                                    width={30} height={30}
                                />}
                                label={tool.title}
                            />
                        )
                    })
                }
            </DialogContent>
        </Dialog>
    );
}

export default ProjectModal;