import { roles } from '../../shared/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import WorkTimeline from '@/shared/components/WorkTimeline/WorkTimeline'

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div>
        <h2>Experience</h2>
        <WorkTimeline roles={roles} />
        <Link className="block h3 mt-8" href="/extended">
          Extended Job History
          <FaArrowRight className="inline align-bottom ml-1 mb-0.5" />
        </Link>
      </div>
    </section>
  )
}

export default Experience
