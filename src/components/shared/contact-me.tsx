import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa6'
import { socialLinks } from '@/data/links'

const ContactMe: React.FC = () => {
  return (
    <div className="flex justify-center gap-6 md:gap-8 w-full">
      <a
        href={socialLinks.GitHub}
        aria-label="GitHub"
        className="group flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md !text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]"
      >
        <FaGithub className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
      </a>
      <a
        href={socialLinks.LinkedIn}
        aria-label="LinkedIn"
        className="group flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md !text-white transition-all duration-300 hover:bg-[#0a66c2]/80 hover:border-[#0a66c2] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(10,102,194,0.35)]"
      >
        <FaLinkedin className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
      </a>
      <a
        href={socialLinks.Email}
        aria-label="Email"
        className="group flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-md !text-white transition-all duration-300 hover:bg-[#ea4335]/80 hover:border-[#ea4335] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(234,67,53,0.35)]"
      >
        <FaEnvelope className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
      </a>
    </div>
  )
}

export default ContactMe
