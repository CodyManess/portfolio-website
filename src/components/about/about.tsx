import React from 'react'
import { SiLetterboxd, SiGoodreads, SiYoutubemusic } from 'react-icons/si'
import { FaGamepad } from 'react-icons/fa6'
import Link from 'next/link'

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="section relative z-[2] shadow-[0px_-12px_20px_black]"
    >
      <div className="container mx-auto px-4 lg:px-6 flex flex-col gap-8">
        <div>
          <h2 className="mb-2">About Me</h2>
          <h3 className="text-xl mb-4">How I got into Tech</h3>
          <p className="leading-relaxed text-base md:text-lg">
            Growing up in rural West Tennessee, I often felt disconnected from
            the familiar fields and small-town life around me. After years of
            relying on dial-up and spotty satellite connections, getting my
            first smartphone at 14 finally provided a consistent link to the
            wider world. That device unlocked the vast resources of the
            internet, allowing me to explore, learn, and connect in ways I had
            never imagined. It also sparked an insatiable curiosity about
            technology that set me on my current path as a full-stack engineer.
            Today, my focus is on building accessible, scalable web and mobile
            applications that help people learn, connect, and simplify their
            daily lives.
          </p>
        </div>

        <div className="flex flex-row justify-between flex-wrap gap-8">
          <div className="max-w-[360px]">
            <h3 className="mb-4">Tech Interests</h3>
            <p className="leading-relaxed">
              Web Development &#128187;, Native & Cross Platform Mobile App
              Development &#128241;, Accessibility, Gen AI Assisted Software
              Development, Code Quality, and Open Source
            </p>
          </div>

          <div className="max-w-[360px]">
            <h3 className="mb-4">Personal Interests</h3>
            <p className="leading-relaxed">
              Taking Care of my Pets &#128021; &#128049;, Politics & News
              &#128240;, Trying new Food, Local Events, or Self Care,
              occasionally traveling &#127758;, and writing new notes on Notion
              &#128211;.
            </p>
          </div>

          <div className="max-w-[360px]">
            <h3 className="mb-4">Favorite Movies, Books, Games, and Music</h3>
            <div className="flex flex-col gap-4 [&_a]:flex [&_a]:items-center [&_a]:text-[var(--foreground)] [&_a]:text-xl [&_svg]:mr-3 [&_svg]:text-2xl">
              <Link
                href="https://letterboxd.com/codyness/"
                target="_blank"
                className="hover:text-[var(--primary-color)] transition-colors"
              >
                <SiLetterboxd /> Letterboxd
              </Link>
              <Link
                href="https://www.goodreads.com/codyness"
                target="_blank"
                className="hover:text-[var(--primary-color)] transition-colors"
              >
                <SiGoodreads /> GoodReads
              </Link>
              <Link
                href="https://www.backloggd.com/u/codyness/"
                target="_blank"
                className="hover:text-[var(--primary-color)] transition-colors"
              >
                <FaGamepad /> Backloggd
              </Link>
              <Link
                href="https://music.youtube.com/channel/UC6zBwn_RPU5-MfYKbkg6BBA?si=syL9spZjwEp_v0cK"
                target="_blank"
                className="hover:text-[var(--primary-color)] transition-colors"
              >
                <SiYoutubemusic /> Youtube Music
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
