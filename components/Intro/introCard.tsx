/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from './intro.module.css'
import ContactMe from '@/shared/components/ContactMe/contactme'
import Image from 'next/image'
import profilePic from '@public/intro/portfolio-picture.webp'

interface IntroCardProps {
  /** Optional image data to display as the profile picture.
   * If not provided, a default image is used.
   */
  imageData?: ArrayBuffer
}

const IntroCard: React.FC<IntroCardProps> = ({ imageData }: IntroCardProps) => {
  return (
    <div
      className={`${styles.introCard} flex p-8 flex-col bg-[var(--surface-background)] rounded-lg`}
      style={{
        backgroundColor: imageData ? 'white' : 'var(--surface-background)',
      }}
    >
      <div className="flex m-[1em_auto] w-[180px] h-[180px] relative rounded-full overflow-hidden">
        {imageData && (
          <img
            src={imageData as unknown as string}
            alt="Cody Maness"
            width="743px"
            height="743px"
            className="w-full h-full"
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
      <h1 className="flex flex-col m-auto text-[3rem]">
        Cody Maness
        <span className="block m-[0.5rem_auto] text-[1.5rem]">
          Web & Mobile Developer
        </span>
      </h1>
      <p className="max-w-[400px] m-[1rem_auto_1.75rem_auto] text-center">
        Mobile and Web Developer with a love for creating engaging, accessible,
        and user-friendly applications.
      </p>
      {!imageData && <ContactMe />}
    </div>
  )
}

export default IntroCard
