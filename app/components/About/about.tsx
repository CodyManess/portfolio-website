import React from 'react'
import { Container } from '@mui/material'
import { SiLetterboxd, SiGoodreads, SiYoutubemusic } from 'react-icons/si'
import { FaGamepad } from 'react-icons/fa6'
import Link from 'next/link'
import styles from './about.module.css'

const About: React.FC = () => {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <Container>
        <h2>About Me</h2>
        <h3>How I got into Tech</h3>
        <p>
          Growing up in rural West TN, I always felt disconnected and out of
          place around the familiar fields, forests, and people of where I was
          from. After years of dial-up and limited satellite internet, I finally
          got my first consistent connection to the wider world, a smartphone.
          At 14, this device gave access the vast resources of the internet,
          where I could explore, learn, and connect with others in ways I never
          imagined. This sparked an insatiable curiosity about technology and
          set me on the path to sharing this experience with others by creating
          accessible and engaging apps that can help others learn, laugh, or
          simply make their day a little easier.
        </p>

        <div className={styles.interestsContainer}>
          <div className={styles.interestBlock}>
            <h3>Tech Interests</h3>
            <p>
              Web Development &#128187;, Native & Cross Platform Mobile App
              Development &#128241;, Accessibility, Gen AI Assisted Software
              Development, Code Quality, and Open Source
            </p>
          </div>

          <div className={styles.interestBlock}>
            <h3>Personal Interests</h3>
            <p>
              Taking Care of my Pets &#128021; &#128049;, Politics & News
              &#128240;, Trying new Food, Local Events, or Self Care,
              occassionally traveling &#127758;, and writing new notes on Notion
              &#128211;.
            </p>
          </div>

          <div className={styles.interestBlock}>
            <h3>Favorite Movies, Books, Games, and Music</h3>
            <div className={styles.aboutLinks}>
              <Link href="https://letterboxd.com/codyness/" target="_blank">
                <SiLetterboxd /> Letterboxd
              </Link>
              <Link href="https://www.goodreads.com/codyness" target="_blank">
                <SiGoodreads /> GoodReads
              </Link>
              <Link
                href="https://www.backloggd.com/u/codyness/"
                target="_blank"
              >
                <FaGamepad /> Backloggd
              </Link>
              <Link
                href="https://music.youtube.com/channel/UC6zBwn_RPU5-MfYKbkg6BBA?si=syL9spZjwEp_v0cK"
                target="_blank"
              >
                <SiYoutubemusic /> Youtube Music
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About
