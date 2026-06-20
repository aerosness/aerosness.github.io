import React from "react";

const AboutContent = () => {
  return (
    <div
      className="about-content-page"
      style={{
        backgroundImage: 'url(resources/img/aboutbg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <h2 style={{ margin: 0 }}>About Me</h2>

      <div className="aero-glass" style={{ padding: '14px 16px' }}>
        <p style={{ margin: '0 0 8px 0' }}>I'm 18, based in Fort Collins, CO, and I build things on the web, mostly with React.</p>
        <p style={{ margin: '0 0 8px 0' }}>Started with gamedev, slowly pulled into full-stack development because curiosity doesn't stop at one stack.</p>
        <p style={{ margin: 0 }}>This site itself is one of my projects built to look and feel like Windows 7, down to the windows you're clicking through right now.</p>
      </div>

      <div style={{ display: 'flex', gap: '14px' }}>
        <div className="aero-glass" style={{ flex: 1, padding: '14px 16px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>What I'm Into</h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: 1.8 }}>
            <li>⚛️ Modern front-end frameworks</li>
            <li>⚙️ Lightweight backend solutions</li>
            <li>🛠️ Open source</li>
            <li>🕹️ Unity game development</li>
          </ul>
        </div>

        <div className="aero-glass" style={{ flex: 1, padding: '14px 16px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Outside of Code</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div>🎮 Gaming & game dev</div>
            <div>🎵 Music production</div>
            <div>🎨 Visual & video editing</div>
            <div>📸 Photography</div>
          </div>
        </div>
      </div>

      <div className="aero-glass" style={{ padding: '14px 16px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Tech Stack</h3>
        <div className="badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
          <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
          <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
          <img src="https://img.shields.io/badge/Python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python" />
          <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
          <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django" />
          <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
          <img src="https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity&logoColor=white" alt="Unity" />
          <img src="https://img.shields.io/badge/Adobe%20Photoshop-31A8FF?style=for-the-badge&logo=adobe%20photoshop&logoColor=white" alt="Photoshop" />
          <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
        </div>
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
      `}</style>
    </div>
  );
};

export default AboutContent;