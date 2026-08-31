import { featuredProjects, moreProjects } from '../../data/portfolio';

const ProjectActions = ({ project }) => (
  <div className="project-actions" aria-label={`${project.title} links`}>
    {project.live && (
      <a
        className="project-link project-link--primary"
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
      >
        View live site
      </a>
    )}
    <a
      className="project-link"
      href={project.source}
      target="_blank"
      rel="noopener noreferrer"
    >
      View source
    </a>
  </div>
);

const FeaturedProject = ({ project }) => (
  <article className="project-card project-card--featured aero-glass">
    <img
      className="project-card__image"
      src={project.image}
      alt={project.imageAlt}
      loading="lazy"
      decoding="async"
    />
    <div className="project-card__body">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <dl className="project-details">
        {project.details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
      <ProjectActions project={project} />
    </div>
  </article>
);

const MoreProject = ({ project }) => (
  <article className="project-card project-card--compact aero-glass">
    <img
      className="project-card__image"
      src={project.image}
      alt={project.imageAlt}
      loading="lazy"
      decoding="async"
    />
    <div className="project-card__body">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p className="project-tech">{project.tech}</p>
      <ProjectActions project={project} />
    </div>
  </article>
);

const ProjectsContent = () => (
  <section className="projects-page window-page" aria-labelledby="projects-heading">
    <header className="projects-header">
      <p className="section-eyebrow">Selected work</p>
      <h1 id="projects-heading">Projects</h1>
      <p>
        Web experiences, full-stack tools, and game prototypes built to explore
        a specific interaction or idea.
      </p>
    </header>

    <section className="featured-projects" aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading">Featured projects</h2>
      <div className="featured-projects__grid">
        {featuredProjects.map((project) => (
          <FeaturedProject key={project.title} project={project} />
        ))}
      </div>
    </section>

    <section className="more-projects" aria-labelledby="more-projects-heading">
      <div className="section-heading-row">
        <div>
          <p className="section-eyebrow">Experiments and events</p>
          <h2 id="more-projects-heading">More work</h2>
        </div>
        <a
          className="project-link"
          href="https://github.com/aerosness?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Browse all repositories
        </a>
      </div>

      <div className="more-projects__grid">
        {moreProjects.map((project) => (
          <MoreProject key={project.title} project={project} />
        ))}
      </div>
    </section>
  </section>
);

export default ProjectsContent;
