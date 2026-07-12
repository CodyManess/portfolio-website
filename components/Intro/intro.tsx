import * as React from 'react'
import IntroCard from './introCard'
import { FaAngleDown } from 'react-icons/fa'

const Intro = () => {
  return (
    <section
      id="home"
      className="flex h-[calc(100vh-56px)] bg-[var(--black)] p-2 items-center relative z-1 sm:h-screen"
    >
      <IntroCard />

      <FaAngleDown
        className="text-[var(--white)] absolute mx-auto inset-x-0 text-[5em] animate-[arrow-pulse-down_2500ms_linear_infinite]"
        aria-hidden="true"
      />
    </section>
  )
}

export default Intro
