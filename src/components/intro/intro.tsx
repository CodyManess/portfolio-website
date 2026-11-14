import * as React from 'react'
import IntroCard from './intro-card'
import { FaAngleDown } from 'react-icons/fa'

const Intro = () => {
  return (
    <section
      id="home"
      className="flex h-[calc(100dvh-56px)] bg-(--black) p-2 items-center relative z-1 sm:h-dvh"
    >
      <IntroCard />

      <FaAngleDown
        className="text-(--white) absolute -bottom-2.5 mx-auto inset-x-0 text-[5em] animate-[arrow-pulse-down_2500ms_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
      />
    </section>
  )
}

export default Intro
