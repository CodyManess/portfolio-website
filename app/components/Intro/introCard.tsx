/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './intro.module.css';
import ContactMe from '../Shared/ContactMe/contactme';
import profilePic from '@/assets/intro/portfolio-picture.webp'
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
            { 
                imageData && <img 
                    src={imageData as unknown as string}
                    alt="Cody Maness"
                    width="743px" height="743px"
                    style={{
                        margin: "1em auto",
                        width: '180px', height: '180px',
                        borderRadius: '50%'
                    }}
                />
            }
            {
                !imageData && <Image 
                    priority
                    src={profilePic} 
                    width={500} height={500}
                    alt="Cody Maness"
                    style={{
                        margin: "1em auto",
                        width: '180px', height: 'auto',
                        borderRadius: '50%'
                    }}
                />
            }

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