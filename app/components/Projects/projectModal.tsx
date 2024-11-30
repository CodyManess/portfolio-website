import { Chip, Dialog, DialogContent, DialogTitle, Slide, Typography } from "@mui/material";
import Project from "./project"
import Image from "next/image";

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
                                icon={<Image src={tool.icon} alt={tool.title}/>}
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