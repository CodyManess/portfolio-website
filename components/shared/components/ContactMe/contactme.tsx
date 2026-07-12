import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa6'
import { socialLinks } from '../../data/links'

const ContactMe: React.FC = () => {
  return (
    <div className="flex justify-around max-w-[40rem] mx-auto w-full [&_svg]:m-4 [&_svg]:w-12 [&_svg]:h-12">
      <a href={socialLinks.GitHub} aria-label="GitHub">
        <FaGithub />
      </a>
      <a href={socialLinks.LinkedIn} aria-label="LinkedIn">
        <FaLinkedin />
      </a>
      <a href={socialLinks.Email} aria-label="Email">
        <FaEnvelope />
      </a>
    </div>
  )
}

export default ContactMe
