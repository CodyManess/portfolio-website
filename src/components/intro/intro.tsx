import * as React from 'react'
import IntroCard from './intro-card'
import { FaAngleDown } from 'react-icons/fa'

const Intro = () => {
  return (
    <section
      id="home"
      className="relative z-1 flex h-[calc(100dvh-56px)] items-center bg-(--black) p-2 sm:h-dvh"
    >
      <IntroCard />

      <FaAngleDown
        className="absolute inset-x-0 -bottom-2.5 mx-auto animate-[arrow-pulse-down_2500ms_linear_infinite] text-[5em] text-(--white) motion-reduce:animate-none"
        aria-hidden="true"
      />
    </section>
  )
}

export default Intro
