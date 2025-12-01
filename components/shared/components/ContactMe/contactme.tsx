import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa6'
import styles from './contactme.module.css'
import { socialLinks } from '../../data/links'

const ContactMe: React.FC = () => {
  return (
    <div className={styles.contactMe}>
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
