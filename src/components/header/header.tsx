import {useState, useEffect} from 'react';
import styles from './header.module.css';

export default function Header() {
    const [atTop, setAtTop] = useState(false);

    const changeNavbar = () => {
        if(window.scrollY >= 80) {
            setAtTop(true)
        } else {
            setAtTop(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNavbar);
    })
    

    return (
        <header className={atTop ? `${styles.navbar} ${styles.active} ${styles.header}` : `${styles.navbar} ${styles.header}`}>
            <ul>
                <li>About</li>
                <li>Education</li>
                <li>Career</li>
                <li>Projects</li>
            </ul>
        </header>
    )
}