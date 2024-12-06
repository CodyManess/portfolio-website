"use client"
import { Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material';
import * as React from 'react';
import Project from '../../models/project';
import ProjectModal from './projectModal';
import Image from "next/image";

const ProjectCard = (project: Project) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card 
                elevation={3}
                style={{ 
                    margin: "8px", 
                    flex: 1, 
                    minWidth: "320px" 
            }}>
                <CardActionArea 
                    style={{ height: '100%' }} 
                    onClick={ handleOpen }
                >
                    <CardContent style={{ height: '100%'}}>
                        <Typography gutterBottom variant="h5" component="h3">
                            { project.title }
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            { project.description }
                        </Typography>
                        {
                            project.tools.map(tool => {
                                return (
                                    <Chip
                                        key={tool.title} 
                                        icon={
                                            <Image 
                                                src={tool.icon} alt={tool.title}
                                                width={30} height={30}
                                            />
                                        }
                                        label={tool.title}
                                    />
                                )
                            })
                        }
                    </CardContent>
                </CardActionArea>
            </Card>

            <ProjectModal project={project} open={open} handleClose={handleClose} />
        </>
    )
}

export default ProjectCard;