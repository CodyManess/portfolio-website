/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './intro.module.css';
import ContactMe from '../Shared/ContactMe/contactme';

interface IntroCardProps {
    imageData?: ArrayBuffer | null;
}

const IntroCard: React.FC<IntroCardProps> = ({imageData}: IntroCardProps) => {

    const introImage = imageData ? imageData : "https://codymaness.com/opengraph-image.jpg";
    
    return (
        <div className={ styles.intro } 
            style={{
                display: "flex",
                padding: "1rem 1.5rem",
                flexFlow: "column",
                backgroundColor: imageData ? "white" : "var(--surface-background)",
                borderRadius: "4px",
        }}>
            <img 
                src={introImage as string}
                alt="Cody Maness" 
                width='144'
                height='144'
                style={{ 
                    margin: "1rem auto",
                    borderRadius: '50%'
                }}
            />

            <h1 style={{ margin: "0.5rem auto", fontSize: "3rem" }}>
                Cody Maness
            </h1>
            <h2 style={{ margin: "0.5rem auto" }}>
                Web & Mobile Developer
            </h2>
            <p style={{ maxWidth: "400px", margin: "1em auto", textAlign: 'center'}}>
                Mobile and Web Developer with a love for creating engaging, accessible, and user-friendly applications.
            </p>
            {
                !imageData && <ContactMe />
            }
        </div>
    );
};

export default IntroCard;