import { SiGithub, SiLinkedin } from 'react-icons/si'
import { FaEnvelope } from 'react-icons/fa'
import styles from './contactme.module.css'
import { socialLinks } from '../../../data/links'

const ContactMe: React.FC = () => {
  return (
    <div
      className={styles.contactMe}
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
      }}
    >
      <a href={socialLinks.GitHub} aria-label="GitHub">
        <SiGithub />
      </a>
      <a href={socialLinks.LinkedIn} aria-label="LinkedIn">
        <SiLinkedin />
      </a>
      <a href={socialLinks.Email} aria-label="Email">
        <FaEnvelope />
      </a>
      {/* <Link href={Links.GitHub} aria-label="Article">
                <Article />
            </Link> */}
    </div>
  )
}

export default ContactMe
