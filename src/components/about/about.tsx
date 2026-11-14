import React from 'react'
import Link from 'next/link'
import {
  FaLaptopCode,
  FaHeart,
  FaBookOpen,
  FaArrowUpRightFromSquare,
  FaQuoteRight,
} from 'react-icons/fa6'
import { techInterests, personalInterests, mediaLinks } from '@/data/about'
import { getSafeExternalUrl } from '@/lib/utils'

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-2 flex justify-center bg-(--section-background) py-16 text-white shadow-[0px_-12px_20px_black] md:py-20"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:px-6">
        <div>
          <h2 className="mb-2">About Me</h2>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-6">
          {/* Hero Row: Journey & Core Mission */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Story Card */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-8 lg:col-span-7 xl:col-span-8 dark:border-white/10 dark:bg-slate-900/50">
              <div>
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-3 py-1 text-xs font-semibold tracking-wider text-sky-200 uppercase dark:bg-white/10">
                  <span>🌱</span> My Journey
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                  How I Got into Tech
                </h3>
                <div className="space-y-4 text-base/relaxed font-normal text-white/95 sm:text-lg">
                  <p>
                    Growing up in rural West Tennessee, I often felt
                    disconnected from the familiar fields and small-town life
                    around me. After years of relying on dial-up and spotty
                    satellite connections, getting my first smartphone at 14
                    finally provided a consistent link to the wider world.
                  </p>
                  <p>
                    That device unlocked the vast resources of the internet,
                    allowing me to explore, learn, and connect in ways I had
                    never imagined. It also sparked an insatiable curiosity
                    about technology that set me on my current path as a
                    full-stack engineer.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Mission Card */}
            <div className="relative flex flex-col justify-start overflow-hidden rounded-3xl border border-white/20 bg-linear-to-br from-slate-950/35 to-slate-950/15 p-6 shadow-lg backdrop-blur-md sm:p-8 lg:col-span-5 xl:col-span-4 dark:border-white/10 dark:from-slate-900/60 dark:to-slate-950/60">
              <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-(--primary-light)/20 blur-2xl" />
              <FaQuoteRight
                className="pointer-events-none absolute -right-2 -bottom-2 text-7xl text-white/10 select-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-3 py-1 text-xs font-semibold tracking-wider text-sky-200 uppercase dark:bg-white/10">
                  <span>🎯</span> Core Mission
                </div>
                <blockquote className="text-xl/snug font-medium text-white italic sm:text-2xl">
                  &ldquo;Building accessible, scalable web and mobile
                  applications that help people learn, connect, and simplify
                  their daily lives.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* 3-Column Bento Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Tech Interests */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 text-sky-300 dark:bg-white/10">
                    <FaLaptopCode className="text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Tech Interests
                    </h3>
                    <p className="text-xs font-medium text-sky-100">
                      Areas I love building in
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {techInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/25 px-3 py-1.5 text-xs font-medium text-white shadow-xs transition-all duration-200 hover:scale-[1.03] hover:border-white/30 hover:bg-slate-950/40 sm:text-sm dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                      <span aria-hidden="true">{interest.emoji}</span>
                      <span>{interest.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Interests */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 text-rose-300 dark:bg-white/10">
                    <FaHeart className="text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Personal Interests
                    </h3>
                    <p className="text-xs font-medium text-sky-100">
                      Life outside the IDE
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {personalInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/25 px-3 py-1.5 text-xs font-medium text-white shadow-xs transition-all duration-200 hover:scale-[1.03] hover:border-white/30 hover:bg-slate-950/40 sm:text-sm dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                      <span aria-hidden="true">{interest.emoji}</span>
                      <span>{interest.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Shelf & Media */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 md:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-slate-900/50">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 text-amber-300 dark:bg-white/10">
                    <FaBookOpen className="text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Cultural Shelf
                    </h3>
                    <p className="text-xs font-medium text-sky-100">
                      Movies, books, games, & music
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {mediaLinks.map((media) => {
                    const Icon = media.icon
                    const safeUrl = getSafeExternalUrl(media.url)
                    if (!safeUrl) return null
                    return (
                      <Link
                        key={media.name}
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between rounded-2xl border border-white/20 bg-slate-950/25 p-3.5 text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/35 hover:bg-slate-950/40 hover:shadow-md dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                        aria-label={`${media.name} - ${media.category} (opens in new tab)`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <Icon
                            className="text-2xl text-white transition-transform duration-200 group-hover:scale-110"
                            aria-hidden="true"
                          />
                          <FaArrowUpRightFromSquare
                            className="text-xs text-white/80 transition-colors group-hover:text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <span className="block text-sm/snug font-semibold">
                            {media.name}
                          </span>
                          <span className="mt-0.5 block text-[11px] font-medium text-sky-100">
                            {media.category}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
