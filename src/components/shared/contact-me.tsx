import type { IconType } from 'react-icons'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6'
import { socialLinks } from '@/data/links'
import { cn, getSafeExternalUrl } from '@/lib/utils'

interface ContactMeProps {
  /** Use `'dark'` when rendered on an always-dark surface such as the footer. */
  surface?: 'adaptive' | 'dark'
}

interface ContactLinkItem {
  href?: string
  label: string
  icon: IconType
  external?: boolean
  hoverClassName?: string
}

const baseButtonClass =
  'group flex size-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:hover:translate-y-0'

const surfaceBaseClasses: Record<
  NonNullable<ContactMeProps['surface']>,
  string
> = {
  dark: 'border-white/20 bg-white/10 text-white focus-visible:ring-white focus-visible:ring-offset-footer',
  adaptive:
    'border-border/90 bg-muted/90 text-foreground/80 focus-visible:ring-ring focus-visible:ring-offset-card dark:border-white/20 dark:bg-white/10 dark:text-white',
}

const neutralHoverClasses: Record<
  NonNullable<ContactMeProps['surface']>,
  string
> = {
  dark: 'hover:bg-white/20 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]',
  adaptive:
    'hover:border-slate-300 hover:bg-slate-200/90 hover:text-foreground hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)] dark:hover:border-white/30 dark:hover:bg-white/20 dark:hover:text-white dark:hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]',
}

const ContactMe = ({ surface = 'adaptive' }: ContactMeProps) => {
  const items: ContactLinkItem[] = [
    {
      href: getSafeExternalUrl(socialLinks.GitHub),
      label: 'GitHub (opens in new tab)',
      icon: FaGithub,
      external: true,
    },
    {
      href: getSafeExternalUrl(socialLinks.LinkedIn),
      label: 'LinkedIn (opens in new tab)',
      icon: FaLinkedin,
      external: true,
      hoverClassName:
        'hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:shadow-[0_10px_20px_rgba(10,102,194,0.35)]',
    },
    {
      href: socialLinks.Email,
      label: 'Email',
      icon: FaEnvelope,
      hoverClassName:
        'hover:border-[#ea4335] hover:bg-[#ea4335] hover:text-white hover:shadow-[0_10px_20px_rgba(234,67,53,0.35)]',
    },
  ]

  return (
    <div className="flex w-full justify-center gap-6 md:gap-8">
      {items.map((item) => {
        if (!item.href) return null
        const Icon = item.icon
        return (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            aria-label={item.label}
            className={cn(
              baseButtonClass,
              surfaceBaseClasses[surface],
              item.hoverClassName ?? neutralHoverClasses[surface]
            )}
          >
            <Icon
              className="size-7 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100"
              aria-hidden="true"
            />
          </a>
        )
      })}
    </div>
  )
}

export default ContactMe
