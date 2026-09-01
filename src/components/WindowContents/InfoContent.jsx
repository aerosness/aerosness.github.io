import { profileLinks } from '../../data/portfolio';

const quickFacts = [
  { label: 'Core stack', value: 'React · JavaScript · Python' },
  {
    label: 'Education',
    value: 'CS freshman at Colorado State University',
  },
  { label: 'Based in', value: 'Fort Collins, Colorado' },
];

const windowShortcuts = [
  {
    id: 'about',
    icon: '/resources/optimized/icons/doc-64.webp',
    label: 'About',
    description: 'Background, interests, and tools',
  },
  {
    id: 'links',
    icon: '/resources/optimized/icons/folder-64.webp',
    label: 'Links',
    description: 'Professional and creative profiles',
  },
];

const InfoContent = ({ openWindow }) => (
  <section className="info-page window-page" aria-labelledby="info-heading">
    <section className="info-hero">
      <div className="info-portrait">
        <img
          className="info-portrait__frame"
          src="/resources/svg/avframe.svg"
          alt=""
          aria-hidden="true"
        />
        <img
          className="info-portrait__photo"
          src="/resources/img/pfp2.jpg"
          alt="Portrait of Semyon Tyo"
        />
      </div>

      <div className="info-intro">
        <p className="info-eyebrow">Frontend-focused full-stack developer</p>
        <h1 id="info-heading">Hi, I’m Semyon Tyo.</h1>
        <p className="info-pronouns">
          he/him · CS freshman at CSU · Fort Collins, Colorado
        </p>
        <p className="info-lede">
          I build playful React experiences and practical Python-backed tools.
          This portfolio is one of them: a from-scratch tribute to the look and
          feel of a Windows 7 desktop.
        </p>

        <div className="info-actions" aria-label="Portfolio actions">
          <button
            type="button"
            className="portfolio-cta portfolio-cta--primary"
            onClick={() => openWindow?.('projects')}
          >
            <img src="/resources/optimized/icons/projects-64.webp" alt="" />
            View projects
          </button>

          {profileLinks.map((link) => (
            <a
              key={link.label}
              className="portfolio-cta portfolio-cta--secondary"
              href={link.href}
              target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}
            >
              <img src={link.icon} alt="" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>

    <dl className="quick-facts" aria-label="Quick facts">
      {quickFacts.map((fact) => (
        <div key={fact.label} className="quick-fact aero-glass">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>

    <nav className="window-shortcuts" aria-label="More about Semyon">
      {windowShortcuts.map((shortcut) => (
        <button
          key={shortcut.id}
          type="button"
          className="window-shortcut aero-glass"
          onClick={() => openWindow?.(shortcut.id)}
        >
          <img src={shortcut.icon} alt="" />
          <span>
            <strong>{shortcut.label}</strong>
            <small>{shortcut.description}</small>
          </span>
        </button>
      ))}
    </nav>
  </section>
);

export default InfoContent;
