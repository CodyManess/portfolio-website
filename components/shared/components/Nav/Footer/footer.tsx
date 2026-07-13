import React from 'react'
import ContactMe from '../../ContactMe/contactme'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0f19] text-slate-400 pt-16 pb-10 text-center border-t border-slate-900">
      <div className="container mx-auto px-4 lg:px-6 mb-12 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white pb-6">
          Thank you for visiting!
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto pb-8 leading-relaxed text-balance text-slate-400">
          Feel free to reach out to me through email or my socials below.
          I&apos;m always open to discussing new projects, creative ideas or
          opportunities to be part of your vision.
        </p>

        <ContactMe />
      </div>

      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-900 pt-8 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p className="mb-2">
              Built by Cody Maness using Next.js, Material-UI, and TypeScript.
            </p>
            <p>Please consider supporting open source projects.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="mb-2">
              Copyright © {new Date().getFullYear()} Cody Maness
            </p>
            <p>Various trademarks held by their respective owners.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
