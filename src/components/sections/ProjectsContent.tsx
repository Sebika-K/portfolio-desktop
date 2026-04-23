import ProjectCard from "../ui/ProjectCard"
import { projects } from "../../data/projects"

export default function ProjectsContent() {
  return (
    <div className="space-y-6 text-neutral-700">
      <div>
        <h2 className="text-3xl font-bold text-orange-500">Projects</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          A few projects that reflect both sides of how I like to build:
          thoughtful user experience design and solid technical implementation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}