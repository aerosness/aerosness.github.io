import { creativeLinks, profileLinks } from '../../data/portfolio';

const explorerLocations = [
  { icon: 'fav-64.webp', label: 'Favorites', level: 0 },
  { icon: 'desk-64.webp', label: 'Desktop', level: 1 },
  { icon: 'download-64.webp', label: 'Downloads', level: 1 },
  { icon: 'folder-64.webp', label: 'Links', level: 1, current: true },
  { icon: 'explorer-64.webp', label: 'Libraries', level: 0 },
  { icon: 'doc-64.webp', label: 'Documents', level: 1 },
  { icon: 'music-64.webp', label: 'Music', level: 1 },
  { icon: 'pic-64.webp', label: 'Pictures', level: 1 },
  { icon: 'vid-64.webp', label: 'Videos', level: 1 },
  { icon: 'pc-64.webp', label: 'Computer', level: 0 },
  { icon: 'net-64.webp', label: 'Network', level: 0 },
];

const LinkCard = ({ link }) => (
  <li className="profile-link-item">
    <a
      className="profile-link-card"
      href={link.href}
      target={link.newTab ? '_blank' : undefined}
      rel={link.newTab ? 'noopener noreferrer' : undefined}
      aria-label={`Open ${link.label}: ${link.description}${
        link.newTab ? ' (opens in a new tab)' : ''
      }`}
      title={`Open ${link.label}`}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <img src={link.icon} alt="" draggable="false" />
      <span className="profile-link-card__copy">
        <strong>{link.label}</strong>
        <small>{link.description}</small>
      </span>
      <span className="profile-link-card__action" aria-hidden="true">
        Open
      </span>
    </a>
  </li>
);

const LinksContent = () => (
  <section className="links-page" aria-labelledby="links-heading">
    <header className="explorer-toolbar">
      <span className="explorer-toolbar__menus" aria-hidden="true">
        <u>F</u>ile <u>E</u>dit <u>V</u>iew <u>T</u>ools <u>H</u>elp
      </span>
      <span className="explorer-toolbar__location">Links</span>
      <img
        src="/resources/optimized/icons/search-32.webp"
        alt=""
        aria-hidden="true"
      />
    </header>

    <div className="links-layout">
      <aside className="explorer-sidebar" aria-label="Explorer locations">
        <ul>
          {explorerLocations.map((item) => (
            <li
              key={item.label}
              className={`explorer-sidebar__item explorer-sidebar__item--level-${item.level}${
                item.current ? ' explorer-sidebar__item--current' : ''
              }`}
            >
              <img src={`/resources/optimized/icons/${item.icon}`} alt="" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      <div className="links-content">
        <header className="links-header">
          <p className="section-eyebrow">Contact and profiles</p>
          <h1 id="links-heading">Find me online</h1>
          <p>
            GitHub is the best place to explore my code. For opportunities or
            collaboration, email and LinkedIn are the quickest ways to reach me.
          </p>
        </header>

        <section aria-labelledby="professional-links-heading">
          <div className="section-heading-row">
            <h2 id="professional-links-heading">Professional</h2>
            <span>{profileLinks.length} items</span>
          </div>
          <ul className="profile-link-grid">
            {profileLinks.map((link) => (
              <LinkCard key={link.label} link={link} />
            ))}
          </ul>
        </section>

        <section className="creative-links" aria-labelledby="creative-links-heading">
          <div className="section-heading-row">
            <h2 id="creative-links-heading">Creative</h2>
            <span>{creativeLinks.length} items</span>
          </div>
          <ul className="profile-link-grid profile-link-grid--compact">
            {creativeLinks.map((link) => (
              <LinkCard key={link.label} link={link} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  </section>
);

export default LinksContent;
