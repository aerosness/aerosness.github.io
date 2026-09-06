const locations = [
  { id: 'info', label: 'Welcome', icon: 'help' },
  { id: 'projects', label: 'Projects', icon: 'projects' },
  { id: 'about', label: 'About me', icon: 'doc' },
  { id: 'links', label: 'Links', icon: 'folder' },
];

export default function FolderLayout({ current, itemCount, openWindow, children }) {
  const location = locations.find((item) => item.id === current);
  return (
    <div className="folder-page">
      <div className="folder-toolbar">
        <div className="folder-address" aria-label="Current folder">
          <img src="/resources/optimized/icons/folder-64.webp" alt="" />
          <button type="button" onClick={() => openWindow('info')}>Semyon Tyo</button>
          <span aria-hidden="true">›</span><strong>{location.label}</strong>
        </div>
        <span className="folder-count">{itemCount} items</span>
      </div>
      <div className="folder-layout">
        <nav className="folder-sidebar" aria-label="Portfolio folders">
          <p><img src="/resources/optimized/icons/fav-64.webp" alt="" />Favorites</p>
          {locations.map((item) => (
            <button key={item.id} type="button" aria-current={item.id === current ? 'page' : undefined}
              onClick={() => openWindow(item.id)}>
              <img src={`/resources/optimized/icons/${item.icon}-64.webp`} alt="" />
              {item.label}
            </button>
          ))}
          <a className="folder-resume" aria-label="Open resume PDF" href="/Semyon_Tyo.pdf" target="_blank" rel="noopener noreferrer">
            <img src="/resources/optimized/icons/doc-64.webp" alt="" />Resume
          </a>
        </nav>
        <div className="folder-content">{children}</div>
      </div>
    </div>
  );
}
