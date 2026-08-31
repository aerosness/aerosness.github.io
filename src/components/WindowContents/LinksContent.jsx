import { useState } from 'react';
import { creativeLinks, profileLinks } from '../../data/portfolio';

const explorerLocations = [
  { id: 'favorites', icon: 'fav-64.webp', label: 'Favorites', level: 0 },
  { id: 'desktop', icon: 'desk-64.webp', label: 'Desktop', level: 1 },
  { id: 'downloads', icon: 'download-64.webp', label: 'Downloads', level: 1 },
  { id: 'links', icon: 'folder-64.webp', label: 'Links', level: 1 },
  { id: 'libraries', icon: 'explorer-64.webp', label: 'Libraries', level: 0 },
  { id: 'documents', icon: 'doc-64.webp', label: 'Documents', level: 1 },
  { id: 'music', icon: 'music-64.webp', label: 'Music', level: 1 },
  { id: 'pictures', icon: 'pic-64.webp', label: 'Pictures', level: 1 },
  { id: 'videos', icon: 'vid-64.webp', label: 'Videos', level: 1 },
  { id: 'computer', icon: 'pc-64.webp', label: 'Computer', level: 0 },
  { id: 'network', icon: 'net-64.webp', label: 'Network', level: 0 },
];

const desktopShortcuts = [
  {
    id: 'info',
    icon: 'help-64.webp',
    label: 'Info',
    description: 'Profile and quick facts',
    windowId: 'info',
  },
  {
    id: 'projects',
    icon: 'projects-64.webp',
    label: 'Projects',
    description: 'Featured work and experiments',
    windowId: 'projects',
  },
  {
    id: 'about',
    icon: 'doc-64.webp',
    label: 'About Me',
    description: 'Background, interests, and tools',
    windowId: 'about',
  },
  {
    id: 'links',
    icon: 'folder-64.webp',
    label: 'Links',
    description: 'Contact and profile shortcuts',
    locationId: 'links',
  },
];

const libraryShortcuts = [
  {
    id: 'documents',
    icon: 'doc-64.webp',
    label: 'Documents',
    description: 'Resume and documents',
  },
  {
    id: 'music',
    icon: 'music-64.webp',
    label: 'Music',
    description: 'Music projects',
  },
  {
    id: 'pictures',
    icon: 'pic-64.webp',
    label: 'Pictures',
    description: 'Photography and visual work',
  },
  {
    id: 'videos',
    icon: 'vid-64.webp',
    label: 'Videos',
    description: 'Videos and creative work',
  },
];

const allLinks = [...profileLinks, ...creativeLinks];
const findLinks = (...labels) =>
  allLinks.filter((link) => labels.includes(link.label));

const locationViews = {
  favorites: {
    eyebrow: 'Quick access',
    title: 'Favorites',
    description: 'Frequently used portfolio destinations in one place.',
    groups: [{ title: 'Pinned shortcuts', links: allLinks }],
  },
  desktop: {
    eyebrow: 'Desktop',
    title: 'Desktop shortcuts',
    description: 'Open another portfolio window from here.',
    shortcutType: 'desktop',
  },
  downloads: {
    eyebrow: 'Downloads',
    title: 'Downloads',
    description: 'Files available from this portfolio.',
    groups: [{ title: 'Files', links: findLinks('Resume') }],
  },
  links: {
    eyebrow: 'Contact and profiles',
    title: 'Find me online',
    description:
      'GitHub is the best place to explore my code. For opportunities or collaboration, email and LinkedIn are the quickest ways to reach me.',
    groups: [
      { title: 'Professional', links: profileLinks },
      { title: 'Creative', links: creativeLinks },
    ],
  },
  libraries: {
    eyebrow: 'Libraries',
    title: 'Libraries',
    description: 'Browse portfolio files by media type.',
    shortcutType: 'libraries',
  },
  documents: {
    eyebrow: 'Libraries · Documents',
    title: 'Documents',
    description: 'Documents available from this portfolio.',
    groups: [{ title: 'Documents', links: findLinks('Resume') }],
  },
  music: {
    eyebrow: 'Libraries · Music',
    title: 'Music',
    description: 'Music projects will appear here as they are published.',
    empty: 'This folder is currently empty.',
    icon: 'music-64.webp',
  },
  pictures: {
    eyebrow: 'Libraries · Pictures',
    title: 'Pictures',
    description: 'Photography and visual projects will appear here.',
    empty: 'This folder is currently empty.',
    icon: 'pic-64.webp',
  },
  videos: {
    eyebrow: 'Libraries · Videos',
    title: 'Videos',
    description: 'Published video and creative work.',
    groups: [{ title: 'Videos', links: findLinks('YouTube') }],
  },
  computer: {
    eyebrow: 'Computer',
    title: 'Development drive',
    description: 'Browse the source code behind my work.',
    groups: [{ title: 'Repositories', links: findLinks('GitHub') }],
  },
  network: {
    eyebrow: 'Network',
    title: 'Network locations',
    description: 'Profiles and contact destinations available online.',
    groups: [
      {
        title: 'Network shortcuts',
        links: findLinks('GitHub', 'LinkedIn', 'Email'),
      },
    ],
  },
};

const itemCount = (count) => `${count} item${count === 1 ? '' : 's'}`;

const LinkCard = ({ link }) => (
  <li className="profile-link-item">
    <a
      className="profile-link-card"
      href={link.href}
      target={link.newTab ? '_blank' : undefined}
      rel={link.newTab ? 'noopener noreferrer' : undefined}
    >
      <img src={link.icon} alt="" draggable="false" />
      <span className="profile-link-card__copy">
        <strong>{link.label}</strong>
        <small>{link.description}</small>
      </span>
    </a>
  </li>
);

const LinkGroup = ({ group, locationId, index }) => {
  const headingId = `${locationId}-group-${index}`;

  return (
    <section
      className={index > 0 ? 'creative-links' : undefined}
      aria-labelledby={headingId}
    >
      <div className="section-heading-row">
        <h2 id={headingId}>{group.title}</h2>
        <span>{itemCount(group.links.length)}</span>
      </div>
      <ul className="profile-link-grid">
        {group.links.map((link) => (
          <LinkCard key={link.label} link={link} />
        ))}
      </ul>
    </section>
  );
};

const ShortcutGrid = ({ shortcuts, onActivate }) => (
  <div className="explorer-shortcut-grid">
    {shortcuts.map((shortcut) => (
      <button
        key={shortcut.id}
        type="button"
        className="explorer-shortcut"
        onClick={() => onActivate(shortcut)}
      >
        <img
          src={`/resources/optimized/icons/${shortcut.icon}`}
          alt=""
          draggable="false"
        />
        <span>
          <strong>{shortcut.label}</strong>
          <small>{shortcut.description}</small>
        </span>
      </button>
    ))}
  </div>
);

const LinksContent = ({ openWindow }) => {
  const [activeLocationId, setActiveLocationId] = useState('links');
  const activeLocation = explorerLocations.find(
    (location) => location.id === activeLocationId,
  );
  const activeView = locationViews[activeLocationId];

  const activateDesktopShortcut = (shortcut) => {
    if (shortcut.locationId) {
      setActiveLocationId(shortcut.locationId);
      return;
    }

    openWindow?.(shortcut.windowId);
  };

  return (
    <section className="links-page" aria-labelledby="links-heading">
      <header className="explorer-toolbar">
        <span className="explorer-toolbar__menus" aria-hidden="true">
          <u>F</u>ile <u>E</u>dit <u>V</u>iew <u>T</u>ools <u>H</u>elp
        </span>
        <span className="explorer-toolbar__location">
          {activeLocation.label}
        </span>
        <img
          src="/resources/optimized/icons/search-32.webp"
          alt=""
          aria-hidden="true"
        />
      </header>

      <div className="links-layout">
        <aside className="explorer-sidebar" aria-label="Explorer locations">
          <ul>
            {explorerLocations.map((item) => {
              const isCurrent = item.id === activeLocationId;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`explorer-sidebar__item explorer-sidebar__item--level-${item.level}${
                      isCurrent ? ' explorer-sidebar__item--current' : ''
                    }`}
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => setActiveLocationId(item.id)}
                  >
                    <img
                      src={`/resources/optimized/icons/${item.icon}`}
                      alt=""
                      draggable="false"
                    />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="links-content">
          <span className="sr-only" aria-live="polite">
            {activeLocation.label} selected
          </span>
          <header className="links-header">
            <p className="section-eyebrow">{activeView.eyebrow}</p>
            <h1 id="links-heading">{activeView.title}</h1>
            <p>{activeView.description}</p>
          </header>

          {activeView.groups?.map((group, index) => (
            <LinkGroup
              key={group.title}
              group={group}
              locationId={activeLocationId}
              index={index}
            />
          ))}

          {activeView.shortcutType === 'desktop' && (
            <ShortcutGrid
              shortcuts={desktopShortcuts}
              onActivate={activateDesktopShortcut}
            />
          )}

          {activeView.shortcutType === 'libraries' && (
            <ShortcutGrid
              shortcuts={libraryShortcuts}
              onActivate={(shortcut) => setActiveLocationId(shortcut.id)}
            />
          )}

          {activeView.empty && (
            <div className="explorer-empty" role="status">
              <img
                src={`/resources/optimized/icons/${activeView.icon}`}
                alt=""
              />
              <h2>{activeView.empty}</h2>
              <p>Select another location from the navigation pane.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default LinksContent;
