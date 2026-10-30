import Image from "next/image";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";
import { ProjectCarousel } from "@/components/project-carousel";
import type { PublicProject } from "@/content/projects/read";
import type { Dictionary } from "@/i18n/dictionaries";

export function ProjectsSection({ projects, copy }: { projects: PublicProject[]; copy: Dictionary["projects"] }) {
  if (!projects.length) return null;
  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title" tabIndex={-1}>
      <div className="section-container">
        <h2 id="projects-title" className="section-title" data-enter="rise">{copy.title}</h2>
        <p className="section-description">{copy.description}</p>
        <ProjectCarousel ids={projects.map((project) => project.id)} labels={copy}>
          {projects.map((project) => (
            <li key={project.id} className="project-item" id={`project-${project.id}`}>
              <article aria-labelledby={`title-${project.id}`} className="project-article">
                <div className="project-preview" data-enter="image">
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1200px) 526px, (min-width: 640px) 480px, 88vw" draggable={false} />
                </div>
                <h3 id={`title-${project.id}`} className="project-title">{project.title}</h3>
                {project.developmentStatus === "in-development" && <p className="project-status">{copy.inDevelopment}</p>}
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                <ul className="project-technologies" aria-label={copy.technologies}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-links">
                  {project.repository && <a className="project-repository" href={project.repository} target="_blank" rel="noopener noreferrer"
                    aria-label={`${copy.repository}: ${project.title} (${copy.newTab})`}>
                    <BsGithub size={20} aria-hidden="true" focusable="false" />
                    {copy.repository}
                  </a>}
                  {project.demo && <a className="project-demo" href={project.demo} target="_blank" rel="noopener noreferrer"
                    aria-label={`${copy.demo}: ${project.title} (${copy.newTab})`}>
                    {copy.demo}
                    <BsBoxArrowUpRight size={18} aria-hidden="true" focusable="false" />
                  </a>}
                </div>
              </article>
            </li>
          ))}
        </ProjectCarousel>
      </div>
    </section>
  );
}
