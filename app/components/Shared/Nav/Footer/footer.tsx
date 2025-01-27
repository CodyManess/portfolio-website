import { Container } from '@mui/material'
import React from 'react'
import ContactMe from '../../ContactMe/contactme'
import styles from './footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <h2>Thank you for visiting my website!</h2>
        <p className="h3" style={{ margin: '1.5em' }}>
          Feel free to reach out to me through email or my socials below.
        </p>

        <ContactMe />

        <hr style={{ margin: '3em 0' }} />

        <p>
          This website would not be possible without some wonderful open-source
          technologies including Next.js, Material-UI, and Typescript.
          <br />
          Please consider supporting these projects if you can. ♡ <br />
          If you would like to see the source code for this website, please
          visit my GitHub page. <br />
        </p>

        <p style={{ marginTop: '2em' }}>Copyright © 2024 Cody Maness</p>
        <p>Various trademarks held by their respective owners.</p>
      </Container>
    </footer>
  )
}

export default Footer
