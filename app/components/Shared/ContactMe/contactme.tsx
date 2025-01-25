import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FaEnvelope } from 'react-icons/fa'
import styles from './contactme.module.css'
import { socialLinks } from '../../../data/links'

const ContactMe: React.FC = () => {
  return (
    <div className={styles.contactMe}>
      <a href={socialLinks.GitHub} aria-label="GitHub">
        <SiGithub />
      </a>
      <a href={socialLinks.LinkedIn} aria-label="LinkedIn">
        <SiLinkedin />
      </a>
      <a href={socialLinks.Email} aria-label="Email">
        <FaEnvelope />
      </a>
    </div>
  )
}

export default ContactMe
