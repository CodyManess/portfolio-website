import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa6'
import { socialLinks } from '@/data/links'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface ContactMeProps {
  /** Use `'dark'` when rendered on an always-dark surface such as the footer. */
  surface?: 'adaptive' | 'dark'
}

const ContactMe = ({ surface = 'adaptive' }: ContactMeProps) => {
  const safeGitHubUrl = getSafeExternalUrl(socialLinks.GitHub)
  const safeLinkedInUrl = getSafeExternalUrl(socialLinks.LinkedIn)
  const baseButtonClasses =
    surface === 'dark'
      ? 'border-white/20 bg-white/10 text-white! hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-[#0b0f19]'
      : 'border-slate-200/90 bg-slate-100/90 text-slate-700! hover:border-slate-300 hover:bg-slate-200/90 hover:text-slate-950! focus-visible:ring-(--primary-color) focus-visible:ring-offset-white dark:border-white/20 dark:bg-white/10 dark:text-white! dark:hover:border-white/30 dark:hover:bg-white/20 dark:hover:text-white! dark:focus-visible:ring-(--primary-light) dark:focus-visible:ring-offset-slate-900'

  return (
    <div className="flex w-full justify-center gap-6 md:gap-8">
      {safeGitHubUrl ? (
        <a
          href={safeGitHubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in new tab)"
          className={cn(
            'group flex size-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]',
            baseButtonClasses
          )}
        >
          <FaGithub
            className="size-7 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </a>
      ) : null}
      {safeLinkedInUrl ? (
        <a
          href={safeLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in new tab)"
          className={cn(
            'group flex size-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white! hover:shadow-[0_10px_20px_rgba(10,102,194,0.35)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
            baseButtonClasses
          )}
        >
          <FaLinkedin
            className="size-7 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          />
        </a>
      ) : null}
      <a
        href={socialLinks.Email}
        aria-label="Email"
        className={cn(
          'group flex size-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#ea4335] hover:bg-[#ea4335] hover:text-white! hover:shadow-[0_10px_20px_rgba(234,67,53,0.35)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          baseButtonClasses
        )}
      >
        <FaEnvelope
          className="size-7 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      </a>
    </div>
  )
}

export default ContactMe
