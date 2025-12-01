import { roles } from '@/shared/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import WorkTimeline from '@/shared/components/WorkTimeline/WorkTimeline'

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div>
        <h2>Experience</h2>
        <WorkTimeline roles={roles} />
        <Link
          className="h3 block mt-8"
          href="/extended"
        >
          Extended Job History
          <FaArrowRight
            className="align-bottom m-[0_0_2px_4px]"
          />
        </Link>
      </div>
    </section>
  )
}

export default Experience
