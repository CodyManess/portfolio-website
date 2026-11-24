import ContactMe from '@/components/shared/contact-me'
import { siteConfig } from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'
import { FaFileLines, FaLocationDot } from 'react-icons/fa6'
import profilePic from '@public/intro/portfolio-picture.webp'

const IntroCard = () => {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center rounded-3xl border border-border/60 bg-card/95 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:px-8 sm:py-7 dark:border-white/5 dark:bg-card/90 dark:shadow-black/50">
      {/* Decorative colored glow blob behind profile picture */}
      <div className="pointer-events-none absolute top-6 -z-10 size-40 rounded-full bg-brand/10 blur-2xl" />

      {/* Profile Pic Ring */}
      <div className="group/avatar relative mb-1">
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary to-brand-light opacity-70 blur-sm transition-opacity duration-300 group-hover/avatar:opacity-100" />
        <div className="relative rounded-full bg-linear-to-tr from-primary to-brand-light p-1 shadow-brand-sm">
          <div className="relative size-32 overflow-hidden rounded-full border-2 border-card bg-muted">
            <Image
              loading="eager"
              fetchPriority="high"
              fill
              placeholder="blur"
              quality={75}
              src={profilePic}
              // The avatar is always rendered in a fixed 128px (size-32) frame
              sizes="128px"
              alt={siteConfig.name}
              className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:hover:scale-100"
            />
          </div>
        </div>
      </div>

      <h1 className="mt-4 bg-linear-to-b from-slate-900 via-slate-800 to-slate-950 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent sm:text-4xl dark:from-white dark:via-slate-100 dark:to-slate-300">
        {siteConfig.name}
      </h1>

      <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
        <span className="font-semibold tracking-wider text-brand uppercase">
          {siteConfig.role}
        </span>
        <span className="text-muted-foreground/70" aria-hidden="true">
          ·
        </span>
        <span className="inline-flex items-center gap-1">
          <FaLocationDot className="size-3 text-brand" aria-hidden="true" />
          <span>{siteConfig.location}</span>
        </span>
      </p>

      <p className="mt-3 mb-4 max-w-sm text-center text-sm/relaxed text-foreground/85">
        {siteConfig.shortDescription}
      </p>

      <Link
        href="/resume"
        className="mb-4 inline-flex h-10 items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-5 text-sm font-semibold text-brand-strong shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-brand-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none motion-reduce:hover:translate-y-0 dark:border-brand/35 dark:bg-brand/15 dark:hover:text-slate-950"
      >
        <FaFileLines className="size-3.5 shrink-0" aria-hidden="true" />
        <span>View Resume</span>
      </Link>

      <div className="flex w-full justify-center border-t border-border/60 pt-4 dark:border-white/5">
        <ContactMe />
      </div>
    </div>
  )
}

export default IntroCard
