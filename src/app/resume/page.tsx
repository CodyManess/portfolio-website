import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import {
  FaArrowUpRightFromSquare,
  FaAward,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaLocationDot,
} from 'react-icons/fa6'
import BackLink from '@/components/shared/back-link'
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

function ResumeSection({
  id,
  title,
  printBreakInsideAvoid = false,
  children,
}: {
  id: string
  title: string
  printBreakInsideAvoid?: boolean
  children: ReactNode
}) {
  return (
    <section
      aria-labelledby={id}
      className={printBreakInsideAvoid ? 'print:break-inside-avoid' : undefined}
    >
      <h2
        id={id}
        className="mb-3 border-b border-border pb-1 text-xs font-bold tracking-wider text-brand uppercase sm:text-sm print:mb-2 print:border-slate-300 print:text-xs print:text-slate-950"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function ResumeContactLink({
  href,
  icon: Icon,
  label,
  external = true,
}: {
  href: string
  icon: IconType
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-1.5 rounded-sm text-foreground/85 underline-offset-4 transition-colors hover:text-brand-strong hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:hover:text-white print:text-slate-900 print:no-underline"
    >
      <Icon
        className="size-3 shrink-0 text-brand print:text-slate-700"
        aria-hidden="true"
      />
      <span>{label}</span>
    </a>
  )
}

function ResumeBulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-xs/relaxed text-foreground/85 marker:text-brand sm:text-sm/relaxed print:space-y-0.5 print:text-xs/snug print:text-slate-800 print:marker:text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

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
      <div className="container mx-auto max-w-4xl px-4 py-8 sm:mt-24 sm:py-12 lg:px-6 print:mt-0 print:max-w-none print:p-0">
        {/* Screen-Only Action Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <BackLink href="/" />
          <PrintResumeButton />
        </div>

        {/* Printable Resume Sheet */}
        <article
          aria-label="Resume"
          className="space-y-7 rounded-2xl border border-border/90 bg-card p-6 text-card-foreground shadow-lg sm:p-10 print:space-y-4 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-slate-950 print:shadow-none"
        >
          {/* Resume Header */}
          <header className="border-b border-border pb-5 print:border-slate-300 print:pb-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between print:flex-row print:items-baseline print:justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl print:text-2xl print:text-slate-950">
                {siteConfig.name}
              </h1>
              <p className="text-base font-semibold text-brand sm:text-lg print:text-sm print:text-slate-800">
                {siteConfig.role}
              </p>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-foreground/85 sm:text-sm print:mt-2 print:text-xs print:text-slate-800">
              <span className="inline-flex items-center gap-1.5">
                <FaLocationDot
                  className="size-3 shrink-0 text-brand print:text-slate-700"
                  aria-hidden="true"
                />
                <span>{siteConfig.location}</span>
              </span>

              <ResumeContactLink
                href={socialLinks.Email}
                icon={FaEnvelope}
                label={emailAddress}
                external={false}
              />

              {safeWebsiteUrl ? (
                <ResumeContactLink
                  href={safeWebsiteUrl}
                  icon={FaGlobe}
                  label={formatDisplayUrl(safeWebsiteUrl)}
                />
              ) : null}

              {safeLinkedInUrl ? (
                <ResumeContactLink
                  href={safeLinkedInUrl}
                  icon={FaLinkedin}
                  label={formatDisplayUrl(safeLinkedInUrl)}
                />
              ) : null}

              {safeGitHubUrl ? (
                <ResumeContactLink
                  href={safeGitHubUrl}
                  icon={FaGithub}
                  label={formatDisplayUrl(safeGitHubUrl)}
                />
              ) : null}
            </div>
          </header>

          {/* Summary */}
          <ResumeSection id="resume-summary" title="Summary">
            <p className="text-sm/relaxed text-foreground/85 print:text-xs/normal print:text-slate-800">
              {siteConfig.description}
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection id="resume-experience" title="Experience">
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
                      <h3 className="text-base font-semibold text-foreground print:text-sm print:text-slate-950">
                        {role.title}
                      </h3>
                      <p className="text-xs font-medium text-muted-foreground sm:text-sm print:text-xs print:text-slate-700">
                        <span>{role.companyName}</span>
                        {role.location ? <span> · {role.location}</span> : null}
                        {role.employmentType ? (
                          <span> · {role.employmentType}</span>
                        ) : null}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-medium text-muted-foreground print:text-xs print:text-slate-700">
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
                          <h4 className="text-xs font-semibold text-foreground/90 sm:text-sm print:text-xs print:text-slate-900">
                            {section.heading}
                          </h4>
                        ) : null}
                        <ResumeBulletList items={section.items} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Technical Skills */}
          <ResumeSection
            id="resume-skills"
            title="Technical Skills"
            printBreakInsideAvoid
          >
            <div className="space-y-1.5 text-xs/relaxed text-foreground/85 sm:text-sm/relaxed print:space-y-1 print:text-xs/snug print:text-slate-800">
              {skillGroups.map((group) => (
                <p key={group.category}>
                  <span className="font-semibold text-foreground print:text-slate-950">
                    {group.category}:{' '}
                  </span>
                  <span>
                    {group.skills.map((skill) => skill.label).join(', ')}
                  </span>
                </p>
              ))}
            </div>
          </ResumeSection>

          {/* Education */}
          <ResumeSection id="resume-education" title="Education">
            <div className="space-y-3 print:space-y-2">
              {degrees.map((degree) => (
                <div
                  key={`${degree.schoolName}-${degree.title}`}
                  className="print:break-inside-avoid"
                >
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 print:flex-row print:items-baseline print:justify-between print:gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground sm:text-base print:text-sm print:text-slate-950">
                        {degree.title}
                      </h3>
                      <p className="text-xs font-medium text-muted-foreground sm:text-sm print:text-xs print:text-slate-700">
                        {degree.schoolName}
                        {degree.subtitle ? ` · ${degree.subtitle}` : ''}
                      </p>
                    </div>
                    {degree.date ? (
                      <span className="shrink-0 font-mono text-xs font-medium text-muted-foreground print:text-xs print:text-slate-700">
                        {degree.date}
                      </span>
                    ) : null}
                  </div>
                  {degree.awards.length > 0 ? (
                    <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs/relaxed text-foreground/85 print:mt-0.5 print:text-slate-800">
                      <FaAward
                        className="size-3 shrink-0 text-amber-600 dark:text-amber-400 print:text-slate-700"
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-foreground print:text-slate-950">
                        Honors:
                      </span>
                      <span>{degree.awards.join(' · ')}</span>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection id="resume-certifications" title="Certifications">
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
                        <h3 className="text-sm font-semibold text-foreground sm:text-base print:text-sm print:text-slate-950">
                          {cert.name}
                        </h3>
                        <p className="text-xs font-medium text-muted-foreground sm:text-sm print:text-xs print:text-slate-700">
                          {metadataParts.join(' · ')}
                        </p>
                      </div>
                      {safeCredentialUrl || safeProgramUrl ? (
                        <a
                          href={safeCredentialUrl ?? safeProgramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-brand underline-offset-4 transition-colors hover:text-brand-strong hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:hover:text-white print:hidden"
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
                      <p className="mt-1 text-xs/relaxed text-foreground/85 print:mt-0.5 print:text-slate-800">
                        <span className="font-semibold text-foreground print:text-slate-950">
                          Key Skills:{' '}
                        </span>
                        {cert.skills.join(', ')}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </ResumeSection>

          {/* Selected Projects */}
          {highlightedProjects.length > 0 ? (
            <ResumeSection id="resume-projects" title="Selected Projects">
              <div className="space-y-4 print:space-y-2.5">
                {highlightedProjects.map((project) => {
                  const safeProjectLink = getSafeExternalUrl(project.link)
                  return (
                    <div
                      key={project.id ?? project.title}
                      className="space-y-1 print:break-inside-avoid"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground sm:text-base print:text-sm print:text-slate-950">
                          {project.title}
                        </h3>
                        {safeProjectLink ? (
                          <a
                            href={safeProjectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-sm text-xs font-medium text-brand underline-offset-4 transition-colors hover:text-brand-strong hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:hover:text-white print:text-slate-700 print:no-underline"
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
                      <p className="text-xs font-medium text-muted-foreground print:text-slate-700">
                        {project.tools.map((tool) => tool.title).join(', ')}
                      </p>
                      <ResumeBulletList items={project.achievements} />
                    </div>
                  )
                })}
              </div>
            </ResumeSection>
          ) : null}
        </article>
      </div>
    </main>
  )
}
