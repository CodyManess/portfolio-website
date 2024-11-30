"use client";
import { Avatar, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { motion, useSpring, useTransform} from 'framer-motion';
import styles from './intro.module.css';
import ContactMe from '../Shared/ContactMe/contactme';

const Intro = () => {

    const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
    const pulsingBg = useTransform(pulse, (r) => {
        return `0px 0px 30px ${r}px #1976d2`
    })

    React.useEffect(() => {
        pulse.set(20);
    }, [pulse])

    return (
            <section
                id="intro" 
                style={{ 
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "var(--black)"
                }}
                className={styles.intro}
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
                        padding: "1.5rem",
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
                            variant="h3"
                            component="h1"
                            sx={{ textAlign: "center" }}
                        >
                            Cody Maness
                        </Typography>
                        <Typography 
                            variant="h5"
                            component="h2"
                            sx={{ textAlign: "center" }}
                        >
                            Web & Mobile Developer
                        </Typography>
                        <ContactMe />
                    </Paper>
                </motion.div>
            </section>
    );
};

export default Intro;