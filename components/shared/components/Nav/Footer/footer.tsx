import React from 'react'
import ContactMe from '../../ContactMe/contactme'
import styles from './footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div
        className="container mx-auto px-4 lg:px-6"
        style={{ marginBottom: '4em' }}
      >
        <h2>Thank you for visiting my website!</h2>
        <p className="h3" style={{ margin: '1.5em' }}>
          Feel free to reach out to me through email or my socials below.
        </p>

        <ContactMe />
      </div>

      <div className={styles.subfooter}>
        <div className={styles.acknowledgements}>
          <p>
            Built by Cody Maness with ♡ as well as Next.js, Material-UI, and
            Typescript.
            <br />
            Please consider supporting these projects if you can.
            <br />
          </p>
        </div>
        <div className={styles.disclaimer}>
          <p>Copyright © 2024 Cody Maness</p>
          <p>Various trademarks held by their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
