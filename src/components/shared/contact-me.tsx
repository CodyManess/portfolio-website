import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa6'
import { socialLinks } from '@/data/links'

const ContactMe: React.FC = () => {
  return (
    <div className="flex w-full justify-center gap-6 md:gap-8">
      <a
        href={socialLinks.GitHub}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="group flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
      >
        <FaGithub
          className="size-7 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      </a>
      <a
        href={socialLinks.LinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="group flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#0a66c2] hover:bg-[#0a66c2]/80 hover:shadow-[0_10px_20px_rgba(10,102,194,0.35)]"
      >
        <FaLinkedin
          className="size-7 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />
      </a>
      <a
        href={socialLinks.Email}
        aria-label="Email"
        className="group flex size-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white! backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#ea4335] hover:bg-[#ea4335]/80 hover:shadow-[0_10px_20px_rgba(234,67,53,0.35)]"
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
