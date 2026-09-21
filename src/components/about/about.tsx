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

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-16 md:py-20 flex justify-center relative z-[2] shadow-[0px_-12px_20px_black] bg-[var(--section-background)] text-white"
    >
      <div className="container mx-auto px-4 lg:px-6 flex flex-col gap-8">
        <div>
          <h2 className="mb-2">About Me</h2>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-6">
          {/* Hero Row: Journey & Core Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Story Card */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white/10 dark:bg-slate-900/50 backdrop-blur-md border border-white/15 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-200 bg-white/10 px-3 py-1 rounded-full border border-white/20 w-fit mb-4">
                  <span>🌱</span> My Journey
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  How I Got into Tech
                </h3>
                <div className="space-y-4 text-slate-100/90 text-base sm:text-lg leading-relaxed font-light">
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
            <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-br from-white/15 to-white/5 dark:from-slate-900/60 dark:to-slate-950/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-start shadow-lg relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--primary-light)]/20 rounded-full blur-2xl pointer-events-none" />
              <FaQuoteRight
                className="absolute -bottom-2 -right-2 text-7xl text-white/10 pointer-events-none select-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-200 bg-white/10 px-3 py-1 rounded-full border border-white/20 w-fit mb-4">
                  <span>🎯</span> Core Mission
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium text-white italic leading-snug">
                  &ldquo;Building accessible, scalable web and mobile
                  applications that help people learn, connect, and simplify
                  their daily lives.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* 3-Column Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tech Interests */}
            <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-md border border-white/15 dark:border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-sky-300">
                    <FaLaptopCode className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Tech Interests
                    </h3>
                    <p className="text-xs text-slate-200/80">
                      Areas I love building in
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {techInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-white shadow-xs transition-all duration-200 hover:bg-white/20 hover:scale-[1.03] hover:border-white/30"
                    >
                      <span aria-hidden="true">{interest.emoji}</span>
                      <span>{interest.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Interests */}
            <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-md border border-white/15 dark:border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-rose-300">
                    <FaHeart className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Personal Interests
                    </h3>
                    <p className="text-xs text-slate-200/80">
                      Life outside the IDE
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {personalInterests.map((interest) => (
                    <span
                      key={interest.name}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-medium text-white shadow-xs transition-all duration-200 hover:bg-white/20 hover:scale-[1.03] hover:border-white/30"
                    >
                      <span aria-hidden="true">{interest.emoji}</span>
                      <span>{interest.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cultural Shelf & Media */}
            <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-md border border-white/15 dark:border-white/10 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-white/10 border border-white/15 text-amber-300">
                    <FaBookOpen className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Cultural Shelf
                    </h3>
                    <p className="text-xs text-slate-200/80">
                      Movies, books, games, & music
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {mediaLinks.map((media) => {
                    const Icon = media.icon
                    return (
                      <Link
                        key={media.name}
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col justify-between p-3.5 rounded-2xl bg-white/10 border border-white/15 text-white transition-all duration-200 hover:bg-white/20 hover:border-white/35 hover:-translate-y-1 hover:shadow-md"
                        aria-label={`${media.name} - ${media.category} (opens in new tab)`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className="text-2xl text-white group-hover:scale-110 transition-transform duration-200" />
                          <FaArrowUpRightFromSquare className="text-xs text-white/60 group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <span className="font-semibold text-sm block leading-snug">
                            {media.name}
                          </span>
                          <span className="text-[11px] text-slate-200/80 block mt-0.5">
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
