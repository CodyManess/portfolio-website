"use client";
import * as React from 'react';
import { motion, useSpring, useTransform} from 'framer-motion';
import IntroCard from './introCard';
import { ExpandMore } from '@mui/icons-material';
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
            <section
                id="intro" 
                className={styles.intro}
            >
                <motion.div style={{
                    borderRadius: '4px',
                    boxShadow: pulsingBg,
                    height: 'fit-content',
                }}>
                    <IntroCard />
                </motion.div>
                <ExpandMore className={styles.arrowPulseDown}/>
            </section>
    );
};

export default Intro;