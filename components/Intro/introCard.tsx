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
      className={`${styles.introCard} p-8 flex flex-col rounded-lg ${
        imageData ? 'bg-white' : 'bg-surface-background-light dark:bg-surface-background-dark'
      }`}
    >
      <div className="relative mx-auto w-44 h-44 rounded-full overflow-hidden">
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
      <h1 className="flex flex-col mx-auto text-5xl">
        Cody Maness
        <span className="block mx-auto mt-2 text-2xl">
          Web & Mobile Developer
        </span>
      </h1>
      <p className="max-w-md mx-auto my-4 text-center">
        Mobile and Web Developer with a love for creating engaging, accessible,
        and user-friendly applications.
      </p>
      {!imageData && <ContactMe />}
    </div>
  )
}

export default IntroCard
