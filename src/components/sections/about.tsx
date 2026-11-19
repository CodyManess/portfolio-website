'use client'
import * as React from 'react'
import { useState } from 'react'
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaArrowsRotate,
  FaBookOpen,
  FaBriefcase,
  FaHeart,
  FaLaptopCode,
  FaQuoteRight,
  FaScrewdriverWrench,
} from 'react-icons/fa6'
import {
  mediaLinks,
  personalInterests,
  skillGroups,
  techInterests,
} from '@/data/about'
import { cn, getSafeExternalUrl } from '@/lib/utils'
import { toolIconMap } from '@/lib/tool-icons'
import {
  scrollElementIntoView,
  usePortfolioLinks,
} from '@/components/shared/portfolio-link-context'

type AboutMode = 'professional' | 'personal'

const About: React.FC = () => {
  const [mode, setMode] = useState<AboutMode>('professional')
  const linkContext = usePortfolioLinks()
  const isPersonal = mode === 'personal'

  const handleToggle = () => {
    setMode((prev) => (prev === 'professional' ? 'personal' : 'professional'))
  }

  const handleSkillFilter = (toolTitle: string) => {
    if (linkContext) {
      linkContext.navigateToTool(toolTitle)
      return
    }
    scrollElementIntoView(document.getElementById('projects'), {
      block: 'start',
    })
  }

  return (
    <section
      id="about"
      className="relative z-2 flex justify-center bg-(--section-background) py-16 text-white shadow-[0px_-12px_20px_black] md:py-20"
    >
      <div className="container mx-auto flex flex-col gap-8 px-4 lg:px-6">
        {/* Header with Segmented Flip Switch */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="mb-0">About Me</h2>

          <div className="flex items-center gap-2.5">
            <div
              // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Toolbar of mode toggle buttons is not a form <fieldset>
              role="group"
              aria-label="About section view"
              className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-slate-950/35 p-1 shadow-inner backdrop-blur-md"
            >
              <button
                type="button"
                aria-pressed={!isPersonal}
                onClick={() => setMode('professional')}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:text-sm',
                  !isPersonal
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                )}
              >
                <FaBriefcase className="size-3.5 shrink-0" aria-hidden="true" />
                <span>Professional</span>
              </button>
              <button
                type="button"
                aria-pressed={isPersonal}
                onClick={() => setMode('personal')}
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none sm:text-sm',
                  isPersonal
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                )}
              >
                <FaHeart
                  className={cn(
                    'size-3.5 shrink-0 transition-colors',
                    isPersonal ? 'text-rose-500' : 'text-rose-300'
                  )}
                  aria-hidden="true"
                />
                <span>Personal</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              aria-label={
                isPersonal
                  ? 'Flip to professional side'
                  : 'Flip to personal side'
              }
              title={
                isPersonal
                  ? 'Flip to professional side'
                  : 'Flip to personal side'
              }
              className="group inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-slate-950/35 text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-slate-950/50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <FaArrowsRotate
                className={cn(
                  'size-3.5 transition-transform duration-500 motion-reduce:transition-none',
                  isPersonal ? 'rotate-180' : 'group-hover:rotate-90'
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* 3D Flippable Bento Container */}
        <div className="perspective-[2000px]">
          <div
            className={cn(
              'grid grid-cols-1 transition-transform duration-700 ease-in-out transform-3d motion-reduce:transition-none',
              isPersonal && 'rotate-y-180'
            )}
          >
            {/* Front Face: Professional */}
            <div
              aria-hidden={isPersonal}
              inert={isPersonal}
              className={cn(
                'col-start-1 row-start-1 flex flex-col gap-6 backface-hidden',
                isPersonal && 'pointer-events-none'
              )}
            >
              {/* Top Row: Core Mission & Tech Interests */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Core Mission Card */}
                <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-linear-to-br from-slate-950/35 to-slate-950/15 p-6 shadow-lg backdrop-blur-md sm:p-8 lg:col-span-5 dark:border-white/10 dark:from-slate-900/60 dark:to-slate-950/60">
                  <div className="pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-(--primary-light)/20 blur-2xl" />
                  <FaQuoteRight
                    className="pointer-events-none absolute -right-2 -bottom-2 text-7xl text-white/10 select-none"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-3 py-1 text-xs font-semibold tracking-wider text-sky-200 uppercase dark:bg-white/10">
                      <span aria-hidden="true">🎯</span> Core Mission
                    </div>
                    <blockquote className="text-xl/snug font-medium text-white italic sm:text-2xl">
                      &ldquo;Building accessible, scalable web and mobile
                      applications that help people learn, connect, and simplify
                      their daily lives.&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* Tech Interests */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-8 lg:col-span-7 dark:border-white/10 dark:bg-slate-900/50">
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
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {techInterests.map((interest) => (
                        <span
                          key={interest.name}
                          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/25 px-3.5 py-2 text-xs font-medium text-white shadow-xs transition-all duration-200 hover:scale-[1.03] hover:border-white/30 hover:bg-slate-950/40 sm:text-sm dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                        >
                          <span aria-hidden="true">{interest.emoji}</span>
                          <span>{interest.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Technical Skills Matrix */}
              <div className="rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 text-emerald-300 dark:bg-white/10">
                    <FaScrewdriverWrench
                      className="text-xl"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Technical Skills
                    </h3>
                    <p className="text-xs font-medium text-sky-100">
                      Languages, frameworks, cloud platforms, &amp; tooling ·
                      Click skills with icons to filter projects
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {skillGroups.map((group) => (
                    <div key={group.category} className="space-y-2.5">
                      <h4 className="text-xs font-semibold tracking-wider text-sky-200 uppercase">
                        {group.category}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => {
                          const linkedTool = skill.tool
                          if (linkedTool) {
                            const IconComponent =
                              toolIconMap[linkedTool.iconName]
                            return (
                              <button
                                key={skill.label}
                                type="button"
                                onClick={() =>
                                  handleSkillFilter(linkedTool.title)
                                }
                                aria-label={`Filter projects by ${linkedTool.title}`}
                                className="group/skill inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-sky-200/35 bg-slate-950/35 px-2.5 py-1 text-xs font-medium text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none dark:border-sky-300/30 dark:bg-white/15 dark:hover:bg-white/25"
                              >
                                <IconComponent
                                  className="size-3 shrink-0 text-sky-200 transition-colors group-hover/skill:text-white"
                                  aria-hidden="true"
                                />
                                <span>{skill.label}</span>
                                <FaArrowRight
                                  className="size-2.5 text-sky-200/80 transition-transform duration-200 group-hover/skill:translate-x-0.5 group-hover/skill:text-white"
                                  aria-hidden="true"
                                />
                              </button>
                            )
                          }
                          return (
                            <span
                              key={skill.label}
                              className="inline-flex items-center rounded-lg border border-white/20 bg-slate-950/25 px-2.5 py-1 text-xs font-medium text-white shadow-xs transition-colors hover:border-white/35 hover:bg-slate-950/40 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
                            >
                              {skill.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Back Face: Personal */}
            <div
              aria-hidden={!isPersonal}
              inert={!isPersonal}
              className={cn(
                'col-start-1 row-start-1 flex rotate-y-180 flex-col gap-6 backface-hidden',
                !isPersonal && 'pointer-events-none'
              )}
            >
              {/* Top Row: Story & Personal Interests */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Story Card */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-8 lg:col-span-7 xl:col-span-8 dark:border-white/10 dark:bg-slate-900/50">
                  <div>
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-3 py-1 text-xs font-semibold tracking-wider text-sky-200 uppercase dark:bg-white/10">
                      <span aria-hidden="true">🌱</span> My Journey
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                      How I Got into Tech
                    </h3>
                    <div className="space-y-4 text-base/relaxed font-normal text-white/95 sm:text-lg">
                      <p>
                        Growing up in rural West Tennessee, I often felt
                        disconnected from the familiar fields and small-town
                        life around me. After years of relying on dial-up and
                        spotty satellite connections, getting my first
                        smartphone at 14 finally provided a consistent link to
                        the wider world.
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

                {/* Personal Interests */}
                <div className="flex flex-col justify-between rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 lg:col-span-5 xl:col-span-4 dark:border-white/10 dark:bg-slate-900/50">
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
              </div>

              {/* Bottom Row: Cultural Shelf */}
              <div className="rounded-3xl border border-white/20 bg-slate-950/25 p-6 shadow-lg backdrop-blur-md sm:p-7 dark:border-white/10 dark:bg-slate-900/50">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-2.5 text-amber-300 dark:bg-white/10">
                    <FaBookOpen className="text-xl" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Cultural Shelf
                    </h3>
                    <p className="text-xs font-medium text-sky-100">
                      Movies, books, games, &amp; music
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {mediaLinks.map((media) => {
                    const Icon = media.icon
                    const safeUrl = getSafeExternalUrl(media.url)
                    if (!safeUrl) return null
                    return (
                      <a
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
                      </a>
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
