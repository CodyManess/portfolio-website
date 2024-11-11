import { Container, Typography } from '@mui/material';
import * as React from 'react';
import SchoolCard from './schoolCard';
import { schools } from '../../data/schools';

const Education = () => {
    
    return (
        <div 
            id="education"
            style={{ background: '#1976d2', padding: '4em 0' }}
        >
            <Container>
                <Typography variant="h2" sx={{ color: "white" }}>
                    Education
                </Typography>
                <div style={{ 
                    display: 'flex', 
                    margin: "1em 0", 
                    flexWrap: "wrap" 
                }}>
                {
                    schools.map((role, index) => (
                        <SchoolCard key={ index } { ...role } />
                    ))
                }
                </div>
            </Container>
        </div>
    )
}

export default Education;