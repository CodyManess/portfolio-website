/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './intro.module.css';
import ContactMe from '../Shared/ContactMe/contactme';
import Image from 'next/image';

interface IntroCardProps {
    imageData?: ArrayBuffer;
}

const IntroCard: React.FC<IntroCardProps> = ({imageData}: IntroCardProps) => {
    
    return (
        <div className={ styles.introCard } 
            style={{
                display: "flex",
                padding: "1rem 1.5rem",
                flexFlow: "column",
                backgroundColor: imageData ? "white" : "var(--surface-background)",
                borderRadius: "4px",
        }}>
        <div style={{
            margin: "1em auto",
            width: '180px', height: '180px',
            position: 'relative',
            borderRadius: '50%',
            overflow: 'hidden',
        }}>
            { 
                imageData && <img 
                    src={imageData as unknown as string}
                    alt="Cody Maness"
                    width="743px" height="743px"
                    style={{ width: "100%", height: "100%" }}
                />
            }
            {
                !imageData && <Image 
                    fill priority
                    src="/intro/portfolio-picture.webp"
                    sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw"
                    alt="Cody Maness"
                />
            }
        </div>
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