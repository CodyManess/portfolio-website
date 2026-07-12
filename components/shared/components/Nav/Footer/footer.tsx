import React from 'react'
import ContactMe from '../../ContactMe/contactme'

const Footer: React.FC = () => {
  return (
    <footer className="text-[var(--white)] bg-[var(--primary-dark)] pt-16 text-center [&_a]:text-[var(--white)]">
      <div className="container mx-auto px-4 lg:px-6 mb-16">
        <h2>Thank you for visiting my website!</h2>
        <p className="h3" style={{ margin: '1.5em' }}>
          Feel free to reach out to me through email or my socials below.
        </p>

        <ContactMe />
      </div>

      <div className="flex flex-row justify-between flex-wrap border-t border-white max-sm:pb-16 [&>div]:min-w-[6em] [&>div]:m-4 [&>div]:grow">
        <div className="text-left max-lg:text-center">
          <p>
            Built by Cody Maness with ♡ as well as Next.js, Material-UI, and
            Typescript.
            <br />
            Please consider supporting these projects if you can.
            <br />
          </p>
        </div>
        <div className="text-right max-lg:text-center">
          <p>Copyright © 2024 Cody Maness</p>
          <p>Various trademarks held by their respective owners.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
