import * as React from 'react'
import IntroCard from './introCard'
import { FaAngleDown } from 'react-icons/fa'
import styles from './intro.module.css'

const Intro = () => {
  return (
    <section id="home" className={styles.intro}>
      <IntroCard />

      <FaAngleDown className={styles.arrowPulseDown} />
    </section>
  )
}

export default Intro
