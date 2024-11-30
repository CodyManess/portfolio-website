import { GitHub, LinkedIn, Email } from "@mui/icons-material"
import { Container } from "@mui/material"
import styles from "./contactme.module.css";
import { socialLinks } from '../../../data/links';
import Link from "next/link";


const ContactMe: React.FC = () => {
    return (
        <Container 
            className={ styles.contactMe }
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                maxWidth: 500
            }}
        >
            <Link href={socialLinks.GitHub} aria-label="GitHub">
                <GitHub />
            </Link>
            <Link href={socialLinks.LinkedIn} aria-label="LinkedIn">
                <LinkedIn />
            </Link>
            <Link href={socialLinks.Email} aria-label="Email">
                <Email />
            </Link>
            {/* <Link href={Links.GitHub} aria-label="Article">
                <Article />
            </Link> */}
        </Container>
    )
}

export default ContactMe;