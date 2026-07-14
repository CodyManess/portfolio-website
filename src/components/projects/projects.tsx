import ProjectList from './project-list'

const Projects = () => {
  return (
    <section id="projects" className="py-16 flex justify-center">
      <div className="container mx-auto px-4 lg:px-6">
        <h2>Projects</h2>
        <ProjectList />
      </div>
    </section>
  )
}

export default Projects
