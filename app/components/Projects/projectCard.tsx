import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import * as React from 'react';
import Project from './project';

const ProjectCard = (project: Project) => {

    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ProjectCard;