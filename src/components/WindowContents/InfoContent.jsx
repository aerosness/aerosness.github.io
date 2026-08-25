import React from 'react';

const InfoContent = ({ openWindow }) => {
  const quickFacts = [
    { icon: '⚛️', label: 'Stack', value: 'React, JS, Python' },
    { icon: '📍', label: 'Based in', value: 'Fort Collins, CO' },
    { icon: '🕹️', label: 'Also into', value: 'Unity / game dev' },
  ];

  const sections = [
    { icon: 'resources/ico/projects.ico', label: 'Projects', desc: 'things I\'ve built' },
    { icon: 'resources/ico/doc.ico', label: 'About', desc: 'stack & background' },
    { icon: 'resources/ico/folder.ico', label: 'Links', desc: 'where else to find me' },
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(resources/img/helpbg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            marginRight: '20px',
            borderRadius: '10%',
            overflow: 'hidden',
          }}
        >
          <img
            src="resources/svg/avframe.svg"
            alt="Avatar Frame"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 999, width: '100%', height: '100%' }}
          />
          <img
            src="resources/img/pfp2.jpg"
            alt="Profile"
            style={{ position: 'absolute', top: '15px', left: '15px', width: '190px', height: '190px', objectFit: 'cover', borderRadius: '5%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '35px' }}>
          <h2 style={{ margin: '0 0 5px 0' }}>Semyon Tyo</h2>
          <p style={{ margin: '0 0 5px 0' }}>he/him</p>
          <p style={{ margin: '0 0 5px 0' }}>18 years</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <img src="resources/img/pin.png" alt="Location" style={{ width: '16px', height: '16px', marginRight: '5px' }} />
            <span>Fort Collins, CO</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <a href="https://github.com/aerosness" target="_blank" rel="noopener noreferrer">
              <img src="resources/img/githublogo.png" alt="GitHub" style={{ width: '24px', height: '24px' }} />
            </a>
            <a href="mailto:aerosness@gmail.com">
              <img src="resources/img/mail.png" alt="Mail" style={{ width: '24px', height: '24px' }} />
            </a>
            <a href="https://aerosness.github.io/Semyon_Tyo.pdf" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '-5px' }}>
              <img src="resources/img/cv.png" alt="CV" style={{ width: '28px', height: '24px' }} />
            </a>
          </div>
        </div>
      </div>

      {/* intro — aero glass */}
      <div
        className="aero-glass"
        style={{
          padding: '12px 16px',
          marginTop: '20px',
          alignSelf: 'center',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <p style={{ margin: 0, textAlign: 'center' }}>
          Hey, I'm Semyon - full-stack web developer based in Fort Collins, CO.
          This whole site is a Windows 7 themed portfolio I built from scratch with React.
        </p>
      </div>

      {/* quick facts row */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '14px', alignSelf: 'center', maxWidth: '800px', width: '100%' }}>
        {quickFacts.map((f, i) => (
          <div key={i} className="aero-glass" style={{ flex: 1, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px' }}>{f.icon}</div>
            <div style={{ fontSize: '10px', opacity: 0.65, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {f.label}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '2px' }}>{f.value}</div>
          </div>
        ))}
      </div>

      {/* nav shortcuts */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px', alignSelf: 'center', maxWidth: '800px', width: '100%' }}>
        {sections.map((s, i) => (
          <div
            key={i}
            className="aero-glass nav-tile"
            role="button"
            tabIndex={0}
            onClick={() => openWindow && openWindow(s.label.toLowerCase())}
            onKeyPress={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && openWindow) openWindow(s.label.toLowerCase());
            }}
            style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img src={s.icon} alt={s.label} style={{ width: '24px', height: '24px' }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '10px', opacity: 0.65 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .aero-glass {
          background: #b6d8fb2f
            linear-gradient(0deg, rgba(231,240,255,0) 0%, rgba(253,254,255,0) 64%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 65%, rgba(231,240,255,0) 90%);
          background-color: #46a2ff5e;
          border-radius: 5px;
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          box-shadow: 0px 3px 10px rgba(0,0,0,0.5),
                      inset 0px 0px 0px 1px #fcfcfc;
          outline: solid 1px #000000;
        }
        .nav-tile {
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .nav-tile:hover {
          background-color: #46a2ff8a;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default InfoContent;