import React from "react";

const AboutContent = () => {
  return (
    <div className="about-content" style={{
      backgroundImage: 'url(resources/img/aboutbg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="content-wrapper">
        <h2 className="section-title">About Me</h2>
        <p>👋 Hey there! I'm a web developer focused on front-end technologies.</p>
        <p>💻 My expertise lies in <b>React.js</b>, <b>JavaScript</b>, and modern web development.</p>
        <p>🚀 I enjoy building interactive and visually appealing web applications.</p>

        <h3>My Interests</h3>
        <ul>
          <li>⚛️ Modern Front-End Frameworks</li>
          <li>⚙️ Lightweight Backend Solutions</li>
          <li>🛠️ Open Source </li>
          <li>🕹️ Unity Game Development</li>
        </ul>

        <h3>Tech Stack</h3>
        <div className="badges">
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

        <h3>Hobbies</h3>
        <div className="hobbies">
          <div className="hobby-item">🎮 Gaming & Game Development</div>
          <div className="hobby-item">🎤 Rap Music</div>
          <div className="hobby-item">🎨 Photoshop Edits</div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
