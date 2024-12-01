import { GitHub, LinkedIn, Email } from "@mui/icons-material"
import styles from "./contactme.module.css";
import { socialLinks } from '../../../data/links';

const ContactMe: React.FC = () => {
    return (
        <div 
            className={ styles.contactMe }
            style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
            }}
        >
            <a href={socialLinks.GitHub} aria-label="GitHub">
                <GitHub />
            </a>
            <a href={socialLinks.LinkedIn} aria-label="LinkedIn">
                <LinkedIn />
            </a>
            <a href={socialLinks.Email} aria-label="Email">
                <Email />
            </a>
            {/* <Link href={Links.GitHub} aria-label="Article">
                <Article />
            </Link> */}
        </div>
    )
}

export default ContactMe;