"use client";
import { Avatar, Container, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { motion, useSpring, useTransform} from 'framer-motion';
import { GitHub, LinkedIn, Email, Article } from '@mui/icons-material';
import styles from './intro.module.css';

const Intro = () => {

    const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
    const pulsingBg = useTransform(pulse, (r) => {
        return `0px 0px 30px ${r}px #1976d2`
    })

    React.useEffect(() => {
        pulse.set(20);
    }, [pulse])

    return (
            <div
                id="intro" 
                style={{ 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    background: "#202020"
                }}
            >
                <motion.div style={{
                    borderRadius: '4px',
                    //boxShadow: pulsingBg
                }}>
                    <Paper sx={{
                        display: "flex",
                        flexGrow: 1, 
                        maxWidth: 650,
                        justifyContent: "center",
                        alignSelf: "center",
                        padding: "1rem",
                        flexFlow: "column wrap"
                    }} elevation={3}>
                        <Avatar sx={{
                            margin: "1rem auto", 
                            width: '8rem', height: '8rem'
                        }}
                        >
                            CM
                        </Avatar>
                        <Typography 
                            variant="h2" 
                            sx={{ textAlign: "center" }}
                        >
                            Cody Maness
                        </Typography>
                        <Container 
                            className={ styles.introLink }
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
            </div>
    );
};

export default Intro;