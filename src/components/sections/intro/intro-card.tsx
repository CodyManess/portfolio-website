import ContactMe from '@/components/shared/contact-me'
import { siteConfig } from '@/config/site'
import Image from 'next/image'
import { FaLocationDot } from 'react-icons/fa6'
import profilePic from '@public/intro/portfolio-picture.webp'

const IntroCard = () => {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center rounded-3xl border border-slate-200/60 bg-white/95 p-8 shadow-xl shadow-slate-900/10 backdrop-blur-xl md:p-10 dark:border-white/5 dark:bg-slate-900/90 dark:shadow-black/50">
      {/* Decorative colored glow blob behind profile picture */}
      <div className="pointer-events-none absolute top-8 -z-10 size-48 rounded-full bg-(--primary-color)/10 blur-2xl dark:bg-(--primary-light)/10" />

      {/* Profile Pic Ring */}
      <div className="group/avatar relative mb-2">
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-(--primary-color) to-(--primary-light) opacity-70 blur-sm transition-opacity duration-300 group-hover/avatar:opacity-100" />
        <div className="relative rounded-full bg-linear-to-tr from-(--primary-color) to-(--primary-light) p-1 shadow-[0_4px_20px_rgba(0,122,184,0.25)] dark:shadow-[0_4px_20px_rgba(25,109,178,0.4)]">
          <div className="relative size-40 overflow-hidden rounded-full border-2 border-white bg-slate-100 dark:border-slate-900">
            <Image
              loading="eager"
              fetchPriority="high"
              fill
              placeholder="blur"
              quality={75}
              src={profilePic}
              // The avatar is always rendered in a fixed 160px (w-40) frame
              sizes="160px"
              alt={siteConfig.name}
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-6 flex flex-col items-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-5xl dark:from-white dark:via-slate-100 dark:to-slate-300">
        {siteConfig.name}
        <span className="mt-2 block text-sm font-semibold tracking-wider text-(--primary-color) uppercase dark:text-(--primary-light)">
          {siteConfig.role}
        </span>
      </h1>

      <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">
        <FaLocationDot
          className="size-3 text-(--primary-color) dark:text-(--primary-light)"
          aria-hidden="true"
        />
        <span>{siteConfig.location}</span>
      </p>

      <p className="mt-3 mb-6 max-w-xs text-center text-sm/relaxed text-slate-700 md:text-base dark:text-slate-200">
        {siteConfig.shortDescription}
      </p>

      <div className="flex w-full justify-center border-t border-slate-200/60 pt-6 dark:border-white/5">
        <ContactMe />
      </div>
    </div>
  )
}

export default IntroCard
