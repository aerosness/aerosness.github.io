import { profileLinks } from '../../data/portfolio';

const shortcuts = [
  { id: 'projects', icon: 'projects', label: 'My projects', description: 'Websites, small tools, and a few games' },
  { id: 'about', icon: 'doc', label: 'About me', description: 'A little background, beyond the code' },
  { id: 'links', icon: 'folder', label: 'Find me online', description: 'GitHub, email, and the rest' },
];

const InfoContent = ({ openWindow }) => (
  <section className="info-page" aria-labelledby="info-heading">
    <div className="welcome-banner">
      <img src="/resources/optimized/icons/pc-64.webp" alt="" />
      <span>Welcome to my desktop</span>
    </div>
    <div className="info-content">
      <header className="info-hero">
        <div className="info-portrait">
          <img className="info-portrait__frame" src="/resources/svg/avframe.svg" alt="" />
          <img className="info-portrait__photo" src="/resources/img/pfp2.jpg" alt="Semyon Tyo" />
        </div>
        <div className="info-intro">
          <h1 id="info-heading">Hi, I’m Semyon.</h1>
          <p className="info-handle">aerosness <span>· he/him</span></p>
          <p className="info-lede">
            I study computer science at Colorado State University. I make
            websites, build things with Python, and sometimes make games.
          </p>
          <p className="info-location">Fort Collins, Colorado</p>
        </div>
      </header>
      <nav className="welcome-shortcuts" aria-label="Explore my portfolio">
        {shortcuts.map((shortcut) => (
          <button key={shortcut.id} type="button" onClick={() => openWindow(shortcut.id)}>
            <img src={`/resources/optimized/icons/${shortcut.icon}-64.webp`} alt="" />
            <span><strong>{shortcut.label}</strong><small>{shortcut.description}</small></span>
            <span className="shortcut-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </nav>
      <footer className="info-footer">
        <p><span className="desktop-tip">Yes, the windows actually move. </span>Make yourself at home.</p>
        <div className="info-contact" aria-label="Contact and resume">
          {profileLinks.filter((link) => link.label !== 'LinkedIn').map((link) => (
            <a key={link.label} href={link.href} target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}>
              {link.label}{link.label === 'Resume' ? ' (PDF)' : ''}
            </a>
          ))}
        </div>
      </footer>
    </div>
  </section>
);

export default InfoContent;
