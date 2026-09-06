import { featuredProjects, moreProjects } from '../../data/portfolio';
import FolderLayout from '../FolderLayout';

const Project = ({ project }) => (
  <article className="project-row">
    <a className="project-preview" href={project.live || project.source} target="_blank" rel="noopener noreferrer"
      aria-label={`Open ${project.title}${project.live ? ' website' : ' on GitHub'}`}>
      <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
    </a>
    <div className="project-copy">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <span className="project-tech">{project.tech}</span>
      <div className="project-actions" aria-label={`${project.title} links`}>
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Website <span aria-hidden="true">↗</span></a>}
        <a href={project.source} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </article>
);

const ProjectsContent = ({ openWindow }) => (
  <FolderLayout current="projects" itemCount={featuredProjects.length + moreProjects.length} openWindow={openWindow}>
    <section className="projects-page" aria-labelledby="projects-heading">
      <header className="folder-heading">
        <h1 id="projects-heading">My projects</h1>
        <p>Things I’ve made, on my own and with other people.</p>
      </header>
      <section className="project-group" aria-labelledby="featured-heading">
        <h2 id="featured-heading">Start here <span>({featuredProjects.length})</span></h2>
        {featuredProjects.map((project) => <Project key={project.title} project={project} />)}
      </section>
      <section className="project-group" aria-labelledby="more-heading">
        <h2 id="more-heading">Smaller projects &amp; game jams <span>({moreProjects.length})</span></h2>
        {moreProjects.map((project) => <Project key={project.title} project={project} />)}
      </section>
      <a className="all-projects-link" href="https://github.com/aerosness?tab=repositories" target="_blank" rel="noopener noreferrer">
        All repositories on GitHub <span aria-hidden="true">↗</span>
      </a>
    </section>
  </FolderLayout>
);

export default ProjectsContent;
