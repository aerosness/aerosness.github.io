import { creativeLinks, profileLinks } from '../../data/portfolio';
import FolderLayout from '../FolderLayout';

const links = [...profileLinks, ...creativeLinks];

const LinksContent = ({ openWindow }) => (
  <FolderLayout current="links" itemCount={links.length} openWindow={openWindow}>
    <section className="links-page" aria-labelledby="links-heading">
      <header className="folder-heading">
        <h1 id="links-heading">Find me online</h1>
        <p>Say hello, look through my code, or grab my resume.</p>
      </header>
      <ul className="profile-link-list">
        {links.map((link) => (
          <li key={link.label}>
            <a className="profile-link-card" href={link.href} target={link.newTab ? '_blank' : undefined}
              rel={link.newTab ? 'noopener noreferrer' : undefined}>
              <img src={link.icon} alt="" draggable="false" />
              <span><strong>{link.label}</strong><small>{link.description}</small></span>
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </FolderLayout>
);

export default LinksContent;
