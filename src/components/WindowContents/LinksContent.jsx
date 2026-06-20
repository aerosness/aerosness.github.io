import React from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';

const links = [
  { href: 'https://github.com/aerosness', img: 'githublogo.png', label: 'Github' },
  { href: 'https://www.youtube.com/@aerosness', img: 'ytlogo.png', label: 'Youtube' },
  { href: 'https://www.tiktok.com/@aerosness', img: 'tiktoklogo.png', label: 'Tiktok' },
  { href: 'https://www.instagram.com/aerosness', img: 'instalogo.png', label: 'Instagram' },
  { href: 'https://www.linkedin.com/in/semyon-tyo-829231380/', img: 'linkedinlogo.png', label: 'LinkedIn' },
];

const sidebarItems = [
  { icon: 'fav.ico', label: 'Favorites', indent: 0, mt: 0 },
  { icon: 'desk.ico', label: 'Desktop', indent: 15, mt: 0 },
  { icon: 'download.ico', label: 'Downloads', indent: 15, mt: 0 },
  { icon: 'folder.ico', label: 'Links', indent: 15, mt: 0 },
  { icon: 'explorer.ico', label: 'Libraries', indent: 0, mt: 15 },
  { icon: 'doc.ico', label: 'Documents', indent: 15, mt: 0 },
  { icon: 'music.ico', label: 'Music', indent: 15, mt: 0 },
  { icon: 'pic.ico', label: 'Pictures', indent: 15, mt: 0 },
  { icon: 'vid.ico', label: 'Videos', indent: 15, mt: 0 },
  { icon: 'pc.ico', label: 'Computer', indent: 0, mt: 15 },
  { icon: 'net.ico', label: 'Network', indent: 0, mt: 35, mb: 20 },
];

const LinksContent = () => {
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        height: '100%',
        minHeight: isMobile ? 'auto' : '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* строка сверху */}
      <div
        className="toolbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px',
          backgroundColor: '#e8e8e8',
          borderBottom: '1px solid #ccc',
          flexShrink: 0,
        }}
      >
        {isMobile ? (
          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Links</div>
        ) : (
          <div style={{ fontSize: '14px' }}>
            <u>F</u>ile <u>E</u>dit <u>V</u>iew <u>T</u>ools <u>H</u>elp
          </div>
        )}
        <img
          style={{ width: '20px', height: '20px' }}
          src="resources/ico/search.ico"
          alt=""
        />
      </div>

      <div
        className="content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          padding: '10px',
          backgroundColor: '#ffffff',
          overflow: 'auto',
        }}
      >
        {/* sidebar прячем на телефоне — на узком экране это просто шум */}
        {!isMobile && (
          <ul
            className="sidebar"
            style={{
              width: '200px',
              flexShrink: 0,
              padding: '5px',
              listStyle: 'none',
            }}
          >
            {sidebarItems.map((item) => (
              <li
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: item.mb ? `${item.mb}px` : '5px',
                  marginLeft: `${item.indent}px`,
                  marginTop: item.mt ? `${item.mt}px` : 0,
                }}
              >
                <img
                  src={`resources/ico/${item.icon}`}
                  alt=""
                  style={{ width: '16px', height: '16px', marginRight: '8px' }}
                />
                {item.label}
              </li>
            ))}
          </ul>
        )}

        <div className="main-content" style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '14px', color: '#555' }}>{links.length} items</p>

          <div
            className="links"
            style={{
              marginTop: '10px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
              gap: '20px',
              justifyItems: 'center',
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                target="_blank"
                rel="noopener noreferrer"
                href={l.href}
                style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
              >
                <img
                  style={{ maxWidth: '50px', maxHeight: '50px' }}
                  src={`resources/img/${l.img}`}
                  alt={l.label}
                />
                <p style={{ marginTop: '4px', fontSize: '12px' }}>{l.label}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksContent;