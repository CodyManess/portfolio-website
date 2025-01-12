import { Container, Typography } from '@mui/material'
import React from 'react'
import ContactMe from '../../Shared/ContactMe/contactme'
import styles from './footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Typography variant="h4" component="h3">
          Thank you for visiting my website!
        </Typography>
        <Typography variant="h6" component="h4" style={{ marginBottom: '1em' }}>
          Feel free to reach out to me through email or my socials below.
        </Typography>

        <ContactMe />

        <hr style={{ margin: '3em 0' }} />

        <Typography component="p">
          This website would not be possible without some wonderful open-source
          technologies including Next.js, Material-UI, and Typescript.
          <br />
          Please consider supporting these projects if you can. ♡ <br />
          If you would like to see the source code for this website, please
          visit my GitHub page. <br />
        </Typography>

        <Typography component="p" style={{ marginTop: '2em' }}>
          Copyright © 2024 Cody Maness
        </Typography>
        <Typography component="p">
          Various trademarks held by their respective owners.
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
