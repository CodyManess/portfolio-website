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
  const isOG = !!imageData

  if (isOG) {
    // Return a simplified, static-styled version optimized for Satori/OG image generation
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          width: '450px',
          padding: '32px',
          borderRadius: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: '16px auto',
            width: '160px',
            height: '160px',
            position: 'relative',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '4px solid #007AB8',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageData as unknown as string}
            alt="Cody Maness"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '9999px',
            }}
          />
        </div>
        <h1
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '16px auto',
            fontSize: '36px',
            textAlign: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: '#0f172a',
          }}
        >
          Cody Maness
          <span
            style={{
              display: 'block',
              marginTop: '8px',
              fontSize: '18px',
              textAlign: 'center',
              color: '#475569',
              fontWeight: '500',
            }}
          >
            Web & Mobile Developer
          </span>
        </h1>
        <p
          style={{
            maxWidth: '380px',
            marginTop: '16px',
            textAlign: 'center',
            color: '#64748b',
            fontSize: '14px',
            lineHeight: '1.5',
          }}
        >
          Mobile and Web Developer with a love for creating engaging,
          accessible, and user-friendly applications.
        </p>
      </div>
    )
  }

  // Otherwise, render the premium design for live users!
  return (
    <div className="relative z-10 w-full max-w-md mx-auto p-8 md:p-10 rounded-3xl border border-slate-200/60 dark:border-white/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl shadow-slate-900/10 dark:shadow-black/50 flex flex-col items-center">
      {/* Decorative colored glow blob behind profile picture */}
      <div className="absolute top-8 w-48 h-48 bg-[var(--primary-color)]/10 dark:bg-[var(--primary-light)]/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      {/* Profile Pic Ring */}
      <div className="relative group/avatar my-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-color)] to-[var(--primary-light)] rounded-full blur-sm opacity-70 group-hover/avatar:opacity-100 transition-opacity duration-300" />
        <div className="relative p-1 bg-gradient-to-tr from-[var(--primary-color)] to-[var(--primary-light)] rounded-full shadow-[0_4px_20px_rgba(0,122,184,0.25)] dark:shadow-[0_4px_20px_rgba(25,109,178,0.4)]">
          <div className="w-40 h-40 relative rounded-full overflow-hidden border-2 border-white dark:border-slate-900 bg-slate-100">
            <Image
              priority
              fill
              placeholder="blur"
              quality={100}
              src={profilePic}
              sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw"
              alt="Cody Maness"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <h1 className="flex flex-col items-center mt-6 text-4xl md:text-5xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 dark:from-white dark:via-slate-100 dark:to-slate-300">
        Cody Maness
        <span className="block text-sm font-semibold uppercase tracking-wider text-[var(--primary-color)] dark:text-[var(--primary-light)] mt-2">
          Web & Mobile Developer
        </span>
      </h1>

      <p className="text-center text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base max-w-xs mt-4 mb-6">
        Mobile and Web Developer with a love for creating engaging, accessible,
        and user-friendly applications.
      </p>

      <div className="w-full border-t border-slate-200/60 dark:border-white/5 pt-6 flex justify-center">
        <ContactMe />
      </div>
    </div>
  )
}

export default IntroCard
