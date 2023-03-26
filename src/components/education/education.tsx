import styles from './education.module.css'

export default function Education() {

    let degrees = [
        {
            university: 'Middle Tennessee State University (MTSU)',
            major: 'MS - Computer Science',
            date: 'June 2021 - Dec 2022'
        },
        {
            university: 'Middle Tennessee State University (MTSU)',
            major: 'BS - Computer Science',
            minors: 'Mathematics and Communications',
            date: 'Aug 2017 - May 2021'
        },
    ]

    var degreesList = degrees.map((degree, key) => (
        <div className={styles.degree} key="key">
            <img src="MTSU_logo.png"/>
            <div>
                <h3>{ degree.major }</h3>
                {degree.minors ? (<p>Minors: Mathematics and Communications</p>) : (<></>) }
                <p>{ degree.date }</p>
            </div>
        </div>
    ))

    return (
        <div className={`section ${styles.education}`}>
            <h2>Education</h2>
            <div className={styles.degrees}>
                { degreesList }
            </div>
        </div>
    )
}