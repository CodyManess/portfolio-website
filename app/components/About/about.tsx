import React from 'react'
import { Typography, Container } from '@mui/material'
import { SiLetterboxd, SiGoodreads, SiYoutubemusic } from 'react-icons/si'
import { FaGamepad } from 'react-icons/fa6'
import Link from 'next/link'
import styles from './about.module.css'

const About: React.FC = () => {
  return (
    <section
      id="about"
      className={'section ' + styles.about}
      style={{
        position: 'relative',
        zIndex: 2,
        boxShadow: '0px -12px 20px black',
      }}
    >
      <Container>
        <Typography variant="h2">About Me</Typography>
        <Typography variant="h6" component="h3">
          How I got into Tech
        </Typography>
        <Typography variant="body1">
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
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: '350px' }}>
            <Typography variant="h6" component="h3">
              Tech Interests
            </Typography>
            <Typography variant="body1">
              Web Development, Native & Cross Platform Mobile App Development,
              Accessibility, Gen AI Assisted Software Development, Code Quality,
              and Open Source
            </Typography>
          </div>

          <div style={{ maxWidth: '350px' }}>
            <Typography variant="h6" component="h3">
              Personal Interests
            </Typography>
            <Typography variant="body1">
              Taking Care of my Pets &#128021; &#128049;, Politics & News
              &#128240;, Trying new Food, Local Events, or Self Care, and
              occassionally traveling &#127758;
            </Typography>
          </div>

          <div style={{ maxWidth: '350px' }}>
            <Typography variant="h6" component="h3">
              Favorite Movies, Books, Games, and Music
            </Typography>
            <div
              className={styles.aboutLinks}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
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
