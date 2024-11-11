import { Container, Typography } from '@mui/material';
import * as React from 'react';

const Projects = () => {

    return (
        <div
            id="projects"
            style={{
                display: 'flex',
                background: 'white',
                padding: '4em 0',
                justifyContent: 'center',
            }}
        >
            <Container>
                <Typography 
                        variant="h2"
                        sx={{ color: "black" }}
                    >
                        Projects
                </Typography>
                {
                    
                }
            </Container>
        </div>
    )
}

export default Projects;