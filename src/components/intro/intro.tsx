import * as React from 'react'
import IntroCard from './intro-card'
import { FaAngleDown } from 'react-icons/fa'

const Intro = () => {
  return (
    <section
      id="home"
      className="flex h-[calc(100dvh-56px)] bg-[var(--black)] p-2 items-center relative z-[1] sm:h-dvh"
    >
      <IntroCard />

      <FaAngleDown
        className="text-[var(--white)] absolute bottom-[-10px] mx-auto inset-x-0 text-[5em] animate-[arrow-pulse-down_2500ms_linear_infinite]"
        aria-hidden="true"
      />
    </section>
  )
}

export default Intro
