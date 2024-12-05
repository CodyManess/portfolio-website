import * as React from 'react';
import IntroCard from './introCard';
import { ExpandMore } from '@mui/icons-material';
import styles from './intro.module.css';

const Intro = () => {

    return (
            <section id="intro" className={styles.intro}>
                <IntroCard />
                
                <ExpandMore className={styles.arrowPulseDown}/>
            </section>
    );
};

export default Intro;