import Header from '@/components/header'
import About from '@/components/about/about'
import Education from '@/components/education/education'
import styles from '@/styles/Home.module.css'
import Projects from '@/components/projects/projects'
import Career from '@/components/career/career'

export default function Home() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <About></About>
      <Education></Education>
      <Career></Career>
      <Projects></Projects>
    </div>
  )
}
