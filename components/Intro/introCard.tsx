import React from 'react'
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
      className="[&_svg]:text-[var(--primary-color)] flex p-8 flex-col rounded-lg"
      style={{
        backgroundColor: imageData ? 'white' : 'var(--surface-background)',
      }}
    >
      <div className="flex my-4 mx-auto w-45 h-45 relative rounded-full overflow-hidden">
        {imageData && (
          <Image
            src={imageData as unknown as string}
            alt="Cody Maness"
            width={743}
            height={743}
            className="w-full h-full"
            unoptimized
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
      <h1 className="flex flex-col m-auto text-5xl text-center">
        Cody Maness
        <span className="block my-2 mx-auto text-2xl text-center">
          Web & Mobile Developer
        </span>
      </h1>
      <p className="max-w-sm mt-4 pb-4 mx-auto text-center">
        Mobile and Web Developer with a love for creating engaging, accessible,
        and user-friendly applications.
      </p>
      {!imageData && <ContactMe />}
    </div>
  )
}

export default IntroCard
