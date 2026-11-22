import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaArrowUpRightFromSquare,
  FaAward,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaLocationDot,
} from 'react-icons/fa6'
import PrintResumeButton from '@/components/sections/resume/print-resume-button'
import { siteConfig } from '@/config/site'
import { certs } from '@/data/education-certs'
import { degrees } from '@/data/education-degrees'
import { roles } from '@/data/experience'
import { socialLinks } from '@/data/links'
import projects from '@/data/projects'
import { skillGroups } from '@/data/tools'
import { getSafeExternalUrl } from '@/lib/utils'

export const metadata: Metadata = {
  title: siteConfig.resumeTitle,
  description: siteConfig.resumeDescription,
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: siteConfig.resumeTitle,
    description: siteConfig.resumeDescription,
    siteName: siteConfig.title,
    locale: 'en_US',
    type: 'website',
    url: `${siteConfig.url}/resume`,
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: `Profile of ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.resumeTitle,
    description: siteConfig.resumeDescription,
    images: [siteConfig.ogImagePath],
  },
}

const formatDisplayUrl = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '')

export default function ResumePage() {
  const emailAddress = socialLinks.Email.replace(/^mailto:/i, '')
  const safeWebsiteUrl = getSafeExternalUrl(siteConfig.url)
  const safeLinkedInUrl = getSafeExternalUrl(socialLinks.LinkedIn)
  const safeGitHubUrl = getSafeExternalUrl(socialLinks.GitHub)
  const highlightedProjects = projects.filter(
    (project) => project.achievements.length > 0
  )

  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:mt-[12vh] sm:py-12 lg:px-6 print:mt-0 print:max-w-none print:p-0">
        {/* Screen-Only Action Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/70 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:border-(--primary-color)/40 focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none sm:text-base dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-(--primary-light)/40 dark:focus-visible:ring-(--primary-light)"
            href="/"
          >
            <FaArrowLeft
              className="text-xs transition-transform duration-200 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            <span>Back to Portfolio</span>
          </Link>
          <PrintResumeButton />
        </div>

        {/* Printable Resume Sheet */}
        <article
          aria-label="Resume"
          className="space-y-7 rounded-2xl border border-slate-200/90 bg-white p-6 text-slate-900 shadow-lg sm:p-10 dark:border-slate-800/80 dark:bg-slate-900/90 dark:text-slate-100 print:space-y-4 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-slate-950 print:shadow-none"
        >
          {/* Resume Header */}
          <header>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between print:flex-row print:items-baseline print:justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white print:text-2xl print:text-slate-950">
                {siteConfig.name}
              </h1>
              <p className="text-base font-semibold text-(--primary-color) sm:text-lg dark:text-(--primary-light) print:text-sm print:text-slate-800">
                {siteConfig.role}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-700 sm:text-sm dark:text-slate-300 print:mt-2 print:text-xs print:text-slate-800">
              <span className="inline-flex items-center gap-1.5">
                <FaLocationDot
                  className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light) print:text-slate-700"
                  aria-hidden="true"
                />
                <span>{siteConfig.location}</span>
              </span>

              <a
                href={socialLinks.Email}
                className="inline-flex items-center gap-1.5 rounded-sm text-slate-700 underline-offset-4 hover:text-(--primary-color) hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-slate-300 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:text-slate-900 print:no-underline"
              >
                <FaEnvelope
                  className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light) print:text-slate-700"
                  aria-hidden="true"
                />
                <span>{emailAddress}</span>
              </a>

              {safeWebsiteUrl ? (
                <a
                  href={safeWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-slate-700 underline-offset-4 hover:text-(--primary-color) hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-slate-300 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:text-slate-900 print:no-underline"
                >
                  <FaGlobe
                    className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light) print:text-slate-700"
                    aria-hidden="true"
                  />
                  <span>{formatDisplayUrl(safeWebsiteUrl)}</span>
                </a>
              ) : null}

              {safeLinkedInUrl ? (
                <a
                  href={safeLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-slate-700 underline-offset-4 hover:text-(--primary-color) hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-slate-300 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:text-slate-900 print:no-underline"
                >
                  <FaLinkedin
                    className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light) print:text-slate-700"
                    aria-hidden="true"
                  />
                  <span>{formatDisplayUrl(safeLinkedInUrl)}</span>
                </a>
              ) : null}

              {safeGitHubUrl ? (
                <a
                  href={safeGitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-slate-700 underline-offset-4 hover:text-(--primary-color) hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-slate-300 dark:hover:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:text-slate-900 print:no-underline"
                >
                  <FaGithub
                    className="size-3 shrink-0 text-(--primary-color) dark:text-(--primary-light) print:text-slate-700"
                    aria-hidden="true"
                  />
                  <span>{formatDisplayUrl(safeGitHubUrl)}</span>
                </a>
              ) : null}
            </div>
          </header>

          {/* Summary */}
          <section aria-labelledby="resume-summary">
            <h2
              id="resume-summary"
              className="mb-2 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:border-slate-300 print:text-xs print:text-slate-950"
            >
              Summary
            </h2>
            <p className="text-sm/relaxed text-slate-700 dark:text-slate-300 print:text-xs/normal print:text-slate-800">
              {siteConfig.description}
            </p>
          </section>

          {/* Experience */}
          <section aria-labelledby="resume-experience">
            <h2
              id="resume-experience"
              className="mb-3 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
            >
              Experience
            </h2>
            <div className="space-y-5 print:space-y-3">
              {roles.map((role) => (
                <div
                  key={
                    role.id ?? `${role.companyName}-${role.title}-${role.date}`
                  }
                  className="space-y-2 print:break-inside-avoid print:space-y-1"
                >
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 print:flex-row print:items-baseline print:justify-between print:gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950 dark:text-white print:text-sm print:text-slate-950">
                        {role.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-300 print:text-xs print:text-slate-700">
                        <span>{role.companyName}</span>
                        {role.location ? <span> · {role.location}</span> : null}
                        {role.employmentType ? (
                          <span> · {role.employmentType}</span>
                        ) : null}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-medium text-slate-600 dark:text-slate-400 print:text-xs print:text-slate-700">
                      {role.date}
                    </span>
                  </div>

                  <div className="space-y-2.5 print:space-y-1.5">
                    {role.description.map((section) => (
                      <div
                        key={`${role.title}-${section.heading ?? section.items[0] ?? 'section'}`}
                        className="space-y-1"
                      >
                        {section.heading ? (
                          <h4 className="text-xs font-semibold text-slate-800 sm:text-sm dark:text-slate-200 print:text-xs print:text-slate-900">
                            {section.heading}
                          </h4>
                        ) : null}
                        <ul className="list-disc space-y-1 pl-5 text-xs/relaxed text-slate-700 marker:text-(--primary-color) sm:text-sm/relaxed dark:text-slate-300 dark:marker:text-(--primary-light) print:space-y-0.5 print:text-xs/snug print:text-slate-800 print:marker:text-slate-700">
                          {section.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section
            aria-labelledby="resume-skills"
            className="print:break-inside-avoid"
          >
            <h2
              id="resume-skills"
              className="mb-3 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
            >
              Technical Skills
            </h2>
            <div className="space-y-1.5 text-xs/relaxed text-slate-700 sm:text-sm/relaxed dark:text-slate-300 print:space-y-1 print:text-xs/snug print:text-slate-800">
              {skillGroups.map((group) => (
                <p key={group.category}>
                  <span className="font-semibold text-slate-900 dark:text-white print:text-slate-950">
                    {group.category}:{' '}
                  </span>
                  <span>
                    {group.skills.map((skill) => skill.label).join(', ')}
                  </span>
                </p>
              ))}
            </div>
          </section>

          {/* Education */}
          <section aria-labelledby="resume-education">
            <h2
              id="resume-education"
              className="mb-3 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
            >
              Education
            </h2>
            <div className="space-y-3 print:space-y-2">
              {degrees.map((degree) => (
                <div
                  key={`${degree.schoolName}-${degree.title}`}
                  className="print:break-inside-avoid"
                >
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 print:flex-row print:items-baseline print:justify-between print:gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950 sm:text-base dark:text-white print:text-sm print:text-slate-950">
                        {degree.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-300 print:text-xs print:text-slate-700">
                        {degree.schoolName}
                        {degree.subtitle ? ` · ${degree.subtitle}` : ''}
                      </p>
                    </div>
                    {degree.date ? (
                      <span className="shrink-0 font-mono text-xs font-medium text-slate-600 dark:text-slate-400 print:text-xs print:text-slate-700">
                        {degree.date}
                      </span>
                    ) : null}
                  </div>
                  {degree.awards.length > 0 ? (
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 print:mt-0.5 print:text-slate-800">
                      <FaAward
                        className="size-3 shrink-0 text-amber-600 dark:text-amber-400 print:text-slate-700"
                        aria-hidden="true"
                      />
                      <span className="font-medium">Honors:</span>
                      <span>{degree.awards.join(' · ')}</span>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section aria-labelledby="resume-certifications">
            <h2
              id="resume-certifications"
              className="mb-3 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
            >
              Certifications
            </h2>
            <div className="space-y-3 print:space-y-2">
              {certs.map((cert) => {
                const safeCredentialUrl = getSafeExternalUrl(cert.credentialUrl)
                const safeProgramUrl = getSafeExternalUrl(cert.programUrl)
                const metadataParts = [
                  cert.org,
                  cert.issueDate ? `Issued ${cert.issueDate}` : undefined,
                  cert.expirationDate
                    ? `Expires ${cert.expirationDate}`
                    : undefined,
                  cert.credentialId ? `ID: ${cert.credentialId}` : undefined,
                ].filter((part): part is string => Boolean(part))

                return (
                  <div key={cert.name} className="print:break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950 sm:text-base dark:text-white print:text-sm print:text-slate-950">
                          {cert.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 sm:text-sm dark:text-slate-300 print:text-xs print:text-slate-700">
                          {metadataParts.join(' · ')}
                        </p>
                      </div>
                      {safeCredentialUrl || safeProgramUrl ? (
                        <a
                          href={safeCredentialUrl ?? safeProgramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-(--primary-color) underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:hidden"
                        >
                          <span>
                            {safeCredentialUrl
                              ? 'Verify Credential'
                              : 'Program Details'}
                          </span>
                          <span className="sr-only">
                            {' '}
                            for {cert.name} (opens in new tab)
                          </span>
                          <FaArrowUpRightFromSquare
                            className="size-2.5 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                    </div>
                    {cert.skills && cert.skills.length > 0 ? (
                      <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 print:mt-0.5 print:text-slate-800">
                        <span className="font-medium text-slate-900 dark:text-slate-100 print:text-slate-950">
                          Key Skills:{' '}
                        </span>
                        {cert.skills.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Selected Projects */}
          {highlightedProjects.length > 0 ? (
            <section aria-labelledby="resume-projects">
              <h2
                id="resume-projects"
                className="mb-3 border-b border-slate-200 pb-1 text-xs font-bold tracking-wider text-(--primary-color) uppercase sm:text-sm dark:border-slate-800 dark:text-(--primary-light) print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
              >
                Selected Projects
              </h2>
              <div className="space-y-4 print:space-y-2.5">
                {highlightedProjects.map((project) => {
                  const safeProjectLink = getSafeExternalUrl(project.link)
                  return (
                    <div
                      key={project.id ?? project.title}
                      className="space-y-1 print:break-inside-avoid"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-slate-950 sm:text-base dark:text-white print:text-sm print:text-slate-950">
                          {project.title}
                        </h3>
                        {safeProjectLink ? (
                          <a
                            href={safeProjectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-(--primary-color) underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:outline-none dark:text-(--primary-light) dark:focus-visible:ring-(--primary-light) print:text-slate-700 print:no-underline"
                          >
                            <span>{formatDisplayUrl(safeProjectLink)}</span>
                            <span className="sr-only">
                              {' '}
                              for {project.title} (opens in new tab)
                            </span>
                            <FaArrowUpRightFromSquare
                              className="size-2.5 shrink-0 print:hidden"
                              aria-hidden="true"
                            />
                          </a>
                        ) : null}
                      </div>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 print:text-slate-700">
                        {project.tools.map((tool) => tool.title).join(', ')}
                      </p>
                      <ul className="list-disc space-y-1 pl-5 text-xs/relaxed text-slate-700 marker:text-(--primary-color) sm:text-sm/relaxed dark:text-slate-300 dark:marker:text-(--primary-light) print:space-y-0.5 print:text-xs/snug print:text-slate-800 print:marker:text-slate-700">
                        {project.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  )
}
