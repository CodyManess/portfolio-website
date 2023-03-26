import styles from './about.module.css';

export default function About() {
    return (
        <div className={styles.about} style={{backgroundImage: `url(${"/alina-G9vRDGA46FY-unsplash.jpg"})`}}>
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img className={styles.headshot} alt="Profile Picture" src="thirteen.svg"/>
            <h1>Cody Maness</h1>
            <h2>Mobile and Web Developer</h2>
            <div>
                <img className={styles.icon} alt="Profile Picture" src="thirteen.svg"/>
                <img className={styles.icon} alt="Profile Picture" src="thirteen.svg"/>
                <img className={styles.icon} alt="Profile Picture" src="thirteen.svg"/>
            </div>
        </div>
    )
}