import { Container, Stack, Typography } from '@mui/material';
import * as React from 'react';
import SchoolCard from './schoolCard';
import { schools } from '../../data/schools';

const Education = () => {
    
    return (
        <section id="education" className="section">
            <Container>
                <Typography variant="h2">
                    Education
                </Typography>
                <Stack direction="row" sx={{ margin: "1em 0", flexWrap: "wrap" }}>
                {
                    schools.map((role, index) => (
                        <SchoolCard key={ index } { ...role } />
                    ))
                }
                </Stack>
            </Container>
        </section>
    )
}

export default Education;