"use client";
import { Avatar, Container, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { animate, motion, useMotionTemplate, useSpring, useTime, useTransform} from 'framer-motion';
import { GitHub, LinkedIn, Email, Article } from '@mui/icons-material';
import './intro.css';

const Intro = () => {

    const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
    const pulsingBg = useTransform(pulse, (r) => {
        return `0px 0px 30px ${r}px blue`
    })

    React.useEffect(() => {
        pulse.set(20);
    }, [])

    return (
            <Container sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95vh"
            }}>
                <motion.div style={{
                    borderRadius: '5%',
                    boxShadow: pulsingBg
                }}>
                    <Paper sx={{
                        display: "flex",
                        flexGrow: 1, 
                        maxWidth: 650,
                        justifyContent: "center",
                        alignSelf: "center",
                        padding: "2em",
                        flexFlow: "column wrap"
                    }} elevation={3}>
                        <Avatar sx={{
                                margin: "1em auto", 
                                width: 150, 
                                height: 150
                            }}
                        >
                            CM
                        </Avatar>
                        <Typography 
                            variant="h2" 
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            Cody Maness
                        </Typography>
                        <Container 
                            className="intro-links"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexWrap: 'wrap'
                            }}   
                        >
                            <GitHub />
                            <LinkedIn />
                            <Email />
                            <Article />
                        </Container>
                    </Paper>
                </motion.div>
            </Container>
    );
};

export default Intro;