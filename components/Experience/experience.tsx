import { roles } from '@/shared/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import WorkTimeline from '@/shared/components/WorkTimeline/WorkTimeline'

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="mx-4">
        <h2>Experience</h2>
        <WorkTimeline roles={roles} />
        <Link className="h3 mt-8 block" href="/extended">
          Extended Job History
          <FaArrowRight className="mb-[2px] ml-1 inline" />
        </Link>
      </div>
    </section>
  )
}

export default Experience
