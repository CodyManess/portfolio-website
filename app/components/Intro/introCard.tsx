/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './intro.module.css'
import ContactMe from '@/shared/components/ContactMe/contactme'
import Image from 'next/image'
import profilePic from '@public/intro/portfolio-picture.webp'

interface IntroCardProps {
  imageData?: ArrayBuffer
}

const IntroCard: React.FC<IntroCardProps> = ({ imageData }: IntroCardProps) => {
  return (
    <div
      className={styles.introCard}
      style={{
        display: 'flex',
        padding: '2rem',
        flexFlow: 'column',
        backgroundColor: imageData ? 'white' : 'var(--surface-background)',
        borderRadius: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          margin: '1em auto',
          width: '180px',
          height: '180px',
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {imageData && (
          <img
            src={imageData as unknown as string}
            alt="Cody Maness"
            width="743px"
            height="743px"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {!imageData && (
          <Image
            priority
            fill
            placeholder="blur"
            quality={100}
            src={profilePic}
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw"
            alt="Cody Maness"
          />
        )}
      </div>
      <h1
        style={{
          display: 'flex',
          flexFlow: 'column',
          margin: 'auto',
          fontSize: '3rem',
        }}
      >
        Cody Maness
        <span
          style={{
            display: 'block',
            margin: '0.5rem auto',
            fontSize: '1.5rem',
          }}
        >
          Web & Mobile Developer
        </span>
      </h1>
      <p
        style={{
          maxWidth: '400px',
          margin: '1rem auto 1.75rem auto',
          textAlign: 'center',
        }}
      >
        Mobile and Web Developer with a love for creating engaging, accessible,
        and user-friendly applications.
      </p>
      {!imageData && <ContactMe />}
    </div>
  )
}

export default IntroCard
