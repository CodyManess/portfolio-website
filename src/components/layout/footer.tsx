import ContactMe from '@/components/shared/contact-me'
import { siteConfig } from '@/config/site'

const currentYear = new Date().getFullYear()

const Footer = () => {
  // Extra bottom padding on mobile keeps content clear of the fixed BottomNav
  return (
    <footer className="border-t border-slate-900 bg-[#0b0f19] pt-16 pb-28 text-center text-slate-400 sm:pb-10">
      <div className="container mx-auto mb-12 flex flex-col items-center px-4 lg:px-6">
        <h2 className="pb-6 text-3xl font-semibold text-white md:text-4xl">
          Thank you for visiting!
        </h2>
        <p className="mx-auto max-w-xl pb-8 text-base/relaxed text-balance text-slate-400 md:text-lg">
          Feel free to reach out to me through email or my socials below.
          I&apos;m always open to discussing new projects, creative ideas or
          opportunities to be part of your vision.
        </p>

        <ContactMe surface="dark" />
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-900 pt-8 text-xs text-slate-400 md:flex-row">
          <div className="text-center md:text-left">
            <p className="mb-2">
              Built by {siteConfig.name} using Next.js, Tailwind CSS, and
              TypeScript.
            </p>
            <p>Please consider supporting open source projects.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-2">
              Copyright © {currentYear} {siteConfig.name}
            </p>
            <p>Various trademarks held by their respective owners.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
