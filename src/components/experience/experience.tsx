import { roles } from '@/data/experience'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import WorkTimeline from '@/components/shared/work-timeline/work-timeline'

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container mx-auto px-4 lg:px-6">
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
