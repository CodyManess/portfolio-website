import IntroCard from './intro-card'
import { FaAngleDown } from 'react-icons/fa6'

const Intro = () => {
  return (
    <section
      id="home"
      className="relative z-1 flex min-h-[calc(100dvh-56px)] items-center justify-center bg-(--black) px-4 pt-6 pb-16 sm:min-h-dvh sm:pt-24 sm:pb-16"
    >
      <IntroCard />

      <FaAngleDown
        className="absolute inset-x-0 bottom-2 mx-auto animate-[arrow-pulse-down_2500ms_linear_infinite] text-4xl text-(--white)/80 motion-reduce:animate-none sm:text-5xl"
        aria-hidden="true"
      />
    </section>
  )
}

export default Intro
